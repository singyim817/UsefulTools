import * as React from "react";
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function Base64Converter() {
  
  const [valueAfter, setValueAfter] = React.useState("");
  const [files, setFile] = React.useState([]);

  const handleChange = (event) => {
    setFile(event.target.files);
    console.log(event.target.files);
  };

  const convertToBase64 = () => {
    try {
      
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = function () {
        const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
        setValueAfter(base64String);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

    } catch (e) {
      console.log(e);
      alert("error", e);
    }
  };

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" fixed>
        <h1>Base64 Converter</h1>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <label htmlFor="contained-button-file">
              <Input accept="*" id="contained-button-file" type="file" onChange={handleChange}/>
              <Button variant="contained" component="span" startIcon={<UploadFileIcon />}>
                Upload
              </Button>
            </label>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant="contained" onClick={convertToBase64} disabled={files.length <= 0}>
                  Convert To Base64
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextareaAutosize
							minRows={3}
							style={{ width: '100%', height: '60vh' }}					
							value={valueAfter}
              readOnly
						/>
            <Grid item xs={12}>
              <Button variant="contained" onClick={() => navigator.clipboard.writeText(valueAfter)} disabled={valueAfter.length <= 0}>
                <ContentCopyIcon />Copy
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Base64Converter;
