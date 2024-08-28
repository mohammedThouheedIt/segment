import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import validateField from "../utils/validateField";
import CustomInput from "./common/input";
import { Typography } from "@mui/material";
import "../assets/css/home.css";
import SelectInput from "./common/SelectInput";
import Footer from "./Footer";
import SegmentHeader from "./SegmentHeader";
import { SEGEMNT_OPTIONS } from "../utils/projectConstant";
import { postSegmentApi } from "../api/segmentApi";
import { errorMessage } from "./common/commonToaster";

const initialFormValues = {
  segment: "",
};

export default function CreateSegment() {
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [selectedSchemas, setSelectedSchemas] = useState([""]);
  const [errors, setErrors] = useState({});
  const [focusedInput, setFocusedInput] = useState("");
  const [availableSchemas, setAvailableSchemas] = useState(SEGEMNT_OPTIONS);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const fieldError = validateField(name, fieldValue);

    setFormValues({
      ...formValues,
      [name]: fieldValue,
    });

    if (fieldError) {
      setErrors({
        [name]: fieldError,
      });
    } else {
      setErrors({});
    }
  };

  const focusHandler = (event) => {
    setFocusedInput(event.target.name);
  };

  const blurHandler = () => {
    setFocusedInput("");
  };
  const handleAddSchema = () => {
    if (
      selectedSchemas?.[selectedSchemas?.length - 1] !== "" &&
      selectedSchemas?.length < SEGEMNT_OPTIONS.length
    ) {
      setSelectedSchemas([...selectedSchemas, ""]);
    } else {
      errorMessage("Please select a schema");
    }
  };
  const handleDelete = (schema) => {
    if (selectedSchemas?.length === 1) setSelectedSchemas([''])
    else setSelectedSchemas(pre => pre.filter(item => item !== schema));
  };
  const handleReset = () => {
    setFormValues(initialFormValues);
    setErrors({});
    setSelectedSchemas([""]);
    setAvailableSchemas(SEGEMNT_OPTIONS);
  }
  const handleSchemaChange = (event, index) => {
    const { value } = event.target;

    // Update the selected schema at the specified index
    const newSchemas = [...selectedSchemas];
    newSchemas[index] = value;

    // Update the available schemas
    const updatedAvailableSchemas = SEGEMNT_OPTIONS.filter(
      (option) => !newSchemas.includes(option.value)
    );

    setSelectedSchemas(newSchemas);
    setAvailableSchemas(updatedAvailableSchemas);
  };

  const handleClear = () => {
    toggleDrawer(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = {};

    Object.keys(formValues).forEach((name) => {
      const value = formValues[name];
      const fieldError = validateField(name, value);
      if (fieldError) {
        formErrors[name] = fieldError;
      }
    });
    // if(selectedSchemas)
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      if (selectedSchemas?.filter(x => x)?.length === 0) {
        errorMessage("Atleast select one schema")
        return
      }
      // Submit the form data
      setLoading(true);
      const data = {
        segment_name: formValues.segment,
        schema: selectedSchemas?.map((schemaValue) => {
          const schemaOption = SEGEMNT_OPTIONS.find((option) => option.value === schemaValue);
          return { [schemaOption?.value]: schemaOption.label };
        }),
      };
      postSegmentApi(data, handleReset)
      // dispatch(signUpApi(formValues, setErr, navigate, setLoading, clearFormValues, handleClickOpen));
    }
  };
  console.log("formValues", formValues, selectedSchemas);

  return (
    <Box sx={{ padding: "25px 0 0 25px" }}>
      <Button onClick={toggleDrawer(true)} variant="outlined">
        {"Save segment"}
      </Button>
      <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
        <SegmentHeader toggleDrawer={toggleDrawer} />

        <Box sx={{ width: 400 }}>
          <Box className="wrapper">
            <CustomInput
              label="Enter the Name of the segment"
              name="segment"
              placeholder="Name of the segment"
              onFocus={focusHandler}
              error={errors?.segment}
              onBlur={blurHandler}
              onChange={changeHandler}
              value={formValues?.segment}
            />
            <Typography
              variant="h6"
              sx={{ margin: "25px 0 0 0", fontSize: "16px" }}
            >
              To save your segment, you need to add the schemas to build the
              query
            </Typography>
            <div className="segment-list-icon">
              <div className="list">
                <div className="user-tasks"></div>
                <span>-User Tasks</span>
              </div>
              <div className="list">
                <div className="group-tasks"></div>
                <span>-Group Tasks</span>
              </div>
            </div>
            <Box className="select-inputs-wrapper">
              {selectedSchemas.map((schema, index) => (
                <div className="select-inputs-wrap">
                  <div className="select-inputs">
                    <SelectInput
                      name={`schema${[index]}`}
                      placeHolder="Add schema to segment"
                      value={schema || ""}
                      handleChange={(e) => handleSchemaChange(e, index)}
                      options={[
                        ...availableSchemas,
                        SEGEMNT_OPTIONS.find((item) => item.value === schema) ??
                        {},
                      ]}
                    />
                  </div>
                  {schema && <button className="del-icon" onClick={() => handleDelete(schema)}>-</button>}
                </div>
              ))}
            </Box>
            <Button
              variant="outlined"
              className="new-schema-btn"
              sx={{color:"#41b494"}}
              onClick={handleAddSchema}
            >
              + Add new schema
            </Button>
          </Box>
        </Box>

        <Footer handleClear={handleClear} handleSubmit={handleSubmit} />
      </Drawer>
    </Box>
  );
}
