import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "app/store";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Emailtemplatecom from "module/Master/EmailTemplate/Component/Emailtemplatecom";
import { selectorGetTemplates } from "./slice/Emailtemplate.selector";
import { ITemplate } from "./slice/Emailtemplate.type";
import { addTemplate } from "./slice/Emailtemplate.slice";
import { getTemplate } from "./slice/Emailtemplate.slice";
import { deleteTemplate } from "./slice/Emailtemplate.slice";
import { updateTemplate } from "./slice/Emailtemplate.slice";
import { Add as AddIcon } from "@mui/icons-material";

function Emailtemplate(): JSX.Element {
  const [selectedtemplate, setSelectedtemplate] = useState<ITemplate | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const message = useSelector((state: any) => state.template.message);
  const dispatch = useDispatch<AppDispatch>();
  const templates = useSelector(selectorGetTemplates);

  const handleOpenModal = (template?: ITemplate) => {
    setSelectedtemplate(template || null);
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    dispatch(getTemplate());
  }, [dispatch]);

  const handleDeleteTemplate = async (id: number) => {
    await dispatch(deleteTemplate(id));
    await dispatch(getTemplate());
    setOpenSnackbar(true);
    handleCloseModal();
  };

  const handleSavetemplate = async (template: ITemplate) => {
    if (selectedtemplate) {
      await dispatch(updateTemplate(template));
    } else {
      await dispatch(addTemplate(template));
    }
    await dispatch(getTemplate());
    setOpenSnackbar(true);
    handleCloseModal();
  };

  const rowsWithActions = templates.map((row, index) => ({
    serialNumber: index + 1,
    template_name: row.template_name,
    subject: row.subject,
    action: (
      <>
        <IconButton
          sx={{ padding: 0, color: "#008CBA" }}
          onClick={() => handleOpenModal(row)}
          title="Edit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{ padding: 0, ml: 1, color: "#f10a0aad" }}
          onClick={() => handleDeleteTemplate(row.tid)}
          title="Delete"
        >
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
      { Header: "Action", accessor: "action", width: "20%" },
    ],
    rows: rowsWithActions,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={0}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h5" fontWeight="medium">
                Template Master
              </MDTypography>
              <Button
                variant="contained"
                onClick={() => handleOpenModal()}
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
                <AddIcon
                  sx={{
                    fontSize: "3rem", // Double the default size
                    marginRight: "4px", // Adds space between icon and text
                  }}
                />
                Add Template
              </Button>
            </MDBox>
            <DataTable table={data} canSearch isSorted={false} noEndBorder />
          </MDBox>
        </Card>
      </MDBox>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Emailtemplatecom
          onClose={handleCloseModal}
          onSave={handleSavetemplate}
          template={selectedtemplate}
        />
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Footer />
    </DashboardLayout>
  );
}

export default Emailtemplate;
