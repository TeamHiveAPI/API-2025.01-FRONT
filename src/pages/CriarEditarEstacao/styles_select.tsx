const styles_select = {
    control: (provided: any, state: any) => ({
      ...provided,
      height: "48px",
      borderColor: state.isFocused ? "#5751D5" : "#ccc",
      borderWidth: state.isFocused ? "2px" : "1px",
      boxShadow: "0px 4px 8px rgba(26, 26, 26, 0.025)",
      "&:hover": {
        borderColor: "#5751D5",
        borderWidth: "2px"
      },
      borderRadius: "8px",
    }),
    menu: (provided: any) => ({
      ...provided,
      paddingTop: "12px",
      paddingBottom: "12px",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#5751D5" : "white",
      color: state.isSelected ? "white" : "#606060",
      "&:hover": {
        backgroundColor: "#5751D5",
        color: "white",
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      height: "32px",
      backgroundColor: "#F5F5F5",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      padding: "5px 10px",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#606060",
      fontWeight: "500",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      cursor: "pointer",
      height: "32px",
      width: "32px",
      backgroundColor: "#E2E1F8",
      color: "#5751D5",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "5px",
      marginLeft: "12px",
      marginRight: "-10px",
      "&:hover": {
        backgroundColor: "#C6C3F8",
        color: "#3A34B0",
      },
    }),
  };
  
  export default styles_select;
  