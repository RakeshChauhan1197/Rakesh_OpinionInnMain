import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "app/store";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Emailtemplatecom from "module/Master/EmailTemplate/Component/Emailtemplatecom";
import { getTemplate, fetchVariables } from "./slice/Emailtemplate.slice";
import { selectorGetTemplates } from "./slice/Emailtemplate.selector";
import { ITemplate } from "./slice/Emailtemplate.type";

function Emailtemplate(): JSX.Element {
  const [selectedtemplate, setSelectedtemplate] = useState<ITemplate | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const templates = useSelector(selectorGetTemplates);
  const [openModal, setOpenModal] = useState(false);
  const addNewTemplate = () => {
    dispatch(fetchVariables());
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    dispatch(getTemplate());
  }, [dispatch]);

  const [dataTableData, setDataTableData] = useState<{
    table: {
      columns: { Header: string; accessor: string; width: string }[];
      rows: any[];
    };
  }>({
    table: {
      columns: [],
      rows: [],
    },
  });

  useEffect(() => {
    const rowsWithActions = templates.map((row, index) => ({
      serialNumber: index + 1,
      template_name: row.template_name,
      subject: row.subject,
      msgBody: row.msgBody,
      action: (
        <>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    }));
    const data = {
      columns: [
        { Header: "S.No", accessor: "serialNumber", width: "20%" },
        { Header: "Template Name", accessor: "template_name", width: "20%" },
        { Header: "Subject", accessor: "subject", width: "25%" },
        { Header: "Action", accessor: "action", width: "25%" },
      ],
      rows: rowsWithActions,
    };

    setDataTableData({ table: data });
  }, [templates]);

  const handleSavetemplate = async (template: ITemplate) => {
    try {
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save software user:", error);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={0}>
          <Card>
            <MDBox p={3} lineHeight={0}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5" fontWeight="medium">
                  Template Master
                </MDTypography>
                <Button
                  variant="contained"
                  onClick={addNewTemplate}
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
                  Add Template
                </Button>
              </MDBox>
              <DataTable table={dataTableData.table} canSearch isSorted={false} noEndBorder />
              <MDBox display="flex" justifyContent="flex-end" p={2}></MDBox>
            </MDBox>
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
            <Emailtemplatecom
              onClose={handleCloseModal}
              onSave={handleSavetemplate}
              template={selectedtemplate}
            />
          </MDBox>
        </MDBox>
      </Modal>
      <Footer />
    </DashboardLayout>
  );
}

export default Emailtemplate;
