import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "app/store";
import { getQuestions } from "./slice/Question.slice";
import { selectorLoading, selectorGetQuestion } from "./slice/Question.selector";
import { IQuestion } from "./slice/Question.type";
import { Button, Card, IconButton, Modal, Snackbar, Alert, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import Questioncom from "./Component/Questioncom";

function Question({ onClose }: { onClose: () => void }) {
  const [PSID, setPSID] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const loadingState = useSelector(selectorLoading);
  const questions = useSelector(selectorGetQuestion);
  const message = useSelector((state: any) => state.country.message);

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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Correct the modal close logic here
  };

  const handlePSIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setPSID(value);
  };

  useEffect(() => {
    if (PSID) {
      dispatch(getQuestions({ PSID }));
    }
  }, [PSID, dispatch]);

  useEffect(() => {
    const rowsWithActions = questions.map((row, index) => ({
      serialNumber: index + 1,
      Qustxt: row.Qustxt,
      Options: row.Options,
      RightAnswer: row.RightAnswer,
      QuestionDataType: row.QuestionDataType,
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
        { Header: "S.No", accessor: "serialNumber", width: "10%" },
        { Header: "Question Text", accessor: "Qustxt", width: "30%" },
        { Header: "Options", accessor: "Options", width: "30%" },
        { Header: "Action", accessor: "action", width: "10%" },
      ],
      rows: rowsWithActions,
    };

    setDataTableData({ table: data });
  }, [questions]);

  return (
    <>
      <MDBox pt={3} pb={3} display="flex" justifyContent="center">
        <MDBox width="70%">
          <Card>
            <MDBox p={3} lineHeight={0}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h5" gutterBottom>
                  Manage Questions
                </MDTypography>
                <Grid>
                  <MDButton
                    variant="contained"
                    onClick={handleOpenModal}
                    sx={{
                      mr: 2,
                      ml: 2,
                      backgroundColor: "#008CBA",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#008CBA",
                      },
                    }}
                  >
                    Add Question
                  </MDButton>
                  <MDButton variant="gradient" color="light" onClick={onClose}>
                    Cancel
                  </MDButton>
                </Grid>
              </MDBox>
            </MDBox>

            <DataTable table={dataTableData.table} canSearch isSorted={false} noEndBorder />
          </Card>
        </MDBox>
      </MDBox>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Questioncom onClose={handleCloseModal} />
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
    </>
  );
}

export default Question;
