import * as React from "react";
import { styled } from '@mui/material/styles';
import { Box, ThemeProvider } from '@mui/system';
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DoneIcon from '@mui/icons-material/Done';


function Base64Converter() {
  
	const [valueBefore, setValueBefore] = React.useState("");
	const [valueAfter, setValueAfter] = React.useState("");
	const [filesBefore, setFilesBefore] = React.useState([]);
	const [filesAfter, setFilesAfter] = React.useState([]);
	const [isValidFile, setIsValidFile] = React.useState(false);
	const [isCopied, setIsCopied] = React.useState(false);

	const handleFileChange = (event) => {
			setFilesBefore(event.target.files);
			setIsCopied(false);
			setValueAfter("");
			console.log(event.target.files);
	};

	const convertToBase64 = () => {
		try {
			
			var reader = new FileReader();
			reader.readAsDataURL(filesBefore[0]);
			reader.onload = function () {
				const base64String = reader.result
				.replace("data:", "")
				.replace(/^.+,/, "");
				setValueAfter(base64String);
			}
			reader.onerror = function (error) {
				console.log('Error: ', error);
				alert("error", error);
			};

		} catch (e) {
			console.log(e);
			alert("error", e);
		}
	};

  const Input = styled('input')({
    display: 'none',
  });

  const boxStyles = {
	justifyContent: 'center',
	bgcolor: 'background.paper',
	borderColor: 'text.primary',
	m: 0,
	border: 5,
	borderRadius: 5,
	borderStyle: 'dotted',
	borderColor: 'grey.100',
	width: '100%',
	height: 444,
 }; 

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" fixed>
        <h1>Base64 Converter</h1>

        <h2>File to Base64</h2>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <label htmlFor="contained-button-file">
              <Input accept="*" id="contained-button-file" type="file" onChange={handleFileChange}/>
              <Button variant="contained" component="span" startIcon={<UploadFileIcon />}>
                Upload
              </Button> {filesBefore.length > 0 ? filesBefore[0].name : ''} 
            </label>
            <Button 
					sx={{ display: filesBefore.length > 0 ? 'inline' : 'none' }} 
					onClick={(e) => { setFiles([]) }}
				>
					<DeleteIcon style={{fill:"red"}} />
				</Button>
            
        		<Divider sx={{ m: 2 }}/>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant="contained" onClick={convertToBase64} disabled={filesBefore.length <= 0}>
                  Convert To Base64
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextareaAutosize
					minRows={3}
					style={{ width: '100%', height: '60vh', overflow: 'auto' }}					
					value={valueAfter}
              	readOnly
				/>
            <Grid container spacing={2}>					
					<Grid item xs={6}>
						<Button 
								variant="contained" 
								onClick={() => {
									navigator.clipboard.writeText(valueAfter);
									setIsCopied(true);
								}} 
								disabled={valueAfter.length <= 0}>
							<ContentCopyIcon />Copy
						</Button>
					</Grid>
					<Grid item xs={6}>
						{ isCopied ? (<Chip label="Successful" color="success" icon={<DoneIcon />} />) : '' }
					</Grid>
				</Grid>
          </Grid>
        </Grid>
		  
		  <Divider sx={{ m: 2 }}/>

		  <h2>Base64 to File</h2>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextareaAutosize
					minRows={3}
					style={{ width: '100%', height: '60vh', overflow: 'auto' }}					
					value={valueBefore}
					onChange={(e) => { setValueBefore(e.target.value) }}
				/>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant="contained" onClick={convertToBase64} disabled={filesAfter.length <= 0}>
                  Convert To Base64
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
				 {/* {{if(isValidFile) {

				 }
				 }} */}
			 <Box sx={boxStyles}>
			 	<InsertDriveFileOutlinedIcon sx={{ margin: '0 auto' }} />
			 </Box>
            <Grid item xs={12}>
              <Button variant="contained" 
				  		onClick={() => navigator.clipboard.writeText(valueAfter)} disabled={valueAfter.length <= 0}
					  disabled={!isValidFile}>
                <InsertDriveFileOutlinedIcon />Download
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Divider />



      </Container>
    </React.Fragment>
  );
}

export default Base64Converter;
