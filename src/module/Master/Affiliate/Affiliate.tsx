import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "app/store";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Affiliatecom from "./Component/Affiliatecom";
import { IAffiliate } from "./slice/Affiliate.type";
import {
  addAffiliate,
  deleteAffiliate,
  getAffiliate,
  getAffiliateByID,
  updateAffiliate,
} from "./slice/Affiliate.slice";
import { selectorGetAffiliate } from "./slice/Affiliate.selector";

function Affiliate(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState<IAffiliate | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const affiliates = useSelector(selectorGetAffiliate);

  const [dataTableData, setDataTableData] = useState({
    table: {
      columns: [],
      rows: [],
    },
  });

  const handleOpenModal = (affiliate?: IAffiliate) => {
    setSelectedAffiliate(affiliate || null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAffiliate(null);
    setOpenModal(false);
  };

  const handleSaveAffiliate = async (affiliate: IAffiliate) => {
    if (selectedAffiliate) {
      await dispatch(updateAffiliate(affiliate)).unwrap();
    } else {
      await dispatch(addAffiliate(affiliate)).unwrap();
    }
    await dispatch(getAffiliate());
    setOpenSnackbar(true);
    handleCloseModal();
  };

  const handleDeleteAffiliate = async (id: number) => {
    await dispatch(deleteAffiliate(id));
    setOpenSnackbar(true);
    await dispatch(getAffiliate());
  };

  useEffect(() => {
    dispatch(getAffiliate());
  }, [dispatch]);

  const handleGetAffiliate = async (id: number) => {
    await dispatch(getAffiliateByID(id));
    setOpenSnackbar(true);
    await dispatch(getAffiliate);
  };

  useEffect(() => {
    const rowsWithActions = affiliates.map((row, index) => ({
      serialNumber: index + 1,
      name: row.name,
      contactPersonName: row.contactPersonName,
      signUpType: row.signupType,
      queryAttribute: row.qryAttribute,
      queryAttribute2: row.qryAttribute2,
      isTSL: row.isTSL === 1 ? "Yes" : "No",
      actions: (
        <>
          <IconButton onClick={() => handleOpenModal(row)} sx={{ padding: 0, color: "#008CBA" }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleGetAffiliate(row.tid)} sx={{ padding: 0 }}>
            <DownloadIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteAffiliate(row.tid)}
            sx={{ padding: 0, color: "#f10a0aad" }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    }));

    const data = {
      columns: [
        { Header: "S.No", accessor: "serialNumber", width: "20%" },
        { Header: "Name", accessor: "name", width: "30%" },
        { Header: "Contact Person Name", accessor: "contactPersonName", width: "60%" },
        { Header: "Signup Type", accessor: "signUpType", width: "30%" },
        { Header: "Query Attribute", accessor: "queryAttribute", width: "60%" },
        { Header: "Query Attribute2", accessor: "queryAttribute2", width: "30%" },
        { Header: "Is TSL", accessor: "isTSL", width: "30%" },
        { Header: "Actions", accessor: "actions", width: "20%" },
      ],
      rows: rowsWithActions,
    };

    setDataTableData({ table: data });
  }, [affiliates]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} lineHeight={0}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5" fontWeight="medium">
                  Affiliate Master
                </MDTypography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectedAffiliate(null);
                    handleOpenModal();
                  }}
                  sx={{
                    ml: 2,
                    backgroundColor: "#008CBA",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#008CBA",
                    },
                  }}
                >
                  Add Affiliate
                </Button>
              </MDBox>
            </MDBox>
            <DataTable table={dataTableData.table} canSearch isSorted={true} noEndBorder />
          </Card>
        </MDBox>
      </MDBox>

      <Modal open={openModal} onClose={handleCloseModal}>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100vw"
          sx={{ paddingLeft: 10 }}
        >
          <MDBox
            sx={{
              width: "100vw",
              maxHeight: "100vh",
              overflowY: "auto",
              backgroundColor: "white",
              padding: 4,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Affiliatecom
              onSave={handleSaveAffiliate}
              onClose={handleCloseModal}
              affiliate={selectedAffiliate}
            />
          </MDBox>
        </MDBox>
      </Modal>
      <Footer />
    </DashboardLayout>
  );
}

export default Affiliate;
