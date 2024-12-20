import { ReactNode } from "react";
import { Theme } from "@mui/material/styles";
import MDBox from "components/MDBox";
interface Props {
  children: ReactNode;
  noBorder?: boolean;
  align?: "left" | "right" | "center";
}

function DataTableBodyCell({ noBorder, align, children }: Props): JSX.Element {
  return (
    <MDBox
      component="td"
      textAlign={align}
      py={0.5}
      px={2}
      sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }: Theme) => ({
        fontSize: size.sm,
        borderBottom: noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <MDBox
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: "middle", marginLeft: "8px" }}
      >
        {children}
      </MDBox>
    </MDBox>
  );
}

DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
};
export default DataTableBodyCell;
