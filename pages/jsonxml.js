import * as React from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

function JSONConverter() {

	var convert = require('xml-js');

	const [jsonValue, setJsonValue] = React.useState('{"id":"value", "description":"text"}');
	const [xmlValue, setXmlValue] = React.useState('');
	const [isJsonCopied, setIsJsonCopied] = React.useState(false);
	const [isXmlCopied, setIsXmlCopied] = React.useState(false);

	const handleChange = (event) => {
		setJsonValue(event.target.value);
	};

	const json2Xml = () => {
		try {
			var a = JSON.parse(jsonValue);
            var options = {
				spaces: '  ',
				compact: true,
            };
			var result = convert.json2xml(jsonValue, options);

            console.log('result', result);
			setXmlValue(result);
			setIsJsonCopied(false);
			setIsXmlCopied(false);
		} catch(e) {
			alert('not JSON format');
		}
	}
	
	const xml2Json = () => {
		try {
            var options = {
				spaces: '  ',
				compact: true,
            };
            var result = convert.xml2json(xmlValue, options);

            console.log('result', result);
			setJsonValue(result);
			setIsJsonCopied(false);
			setIsXmlCopied(false);
		} catch(e) {
			alert('not JSON format');
		}
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="xl" fixed>
				<h1>JSON - XML Converter</h1>
				
				<Grid container spacing={2}>
					<Grid item xs={6}>
                        <h2>JSON data</h2>
						<TextareaAutosize
							aria-label="paste text here"
							minRows={3}
							placeholder="paste text here..."
							style={{ width: '100%', height: '60vh', overflow: 'auto' }}					
							value={jsonValue}
							onChange={(e) => { 
                                
                                setJsonValue(e.target.value);
                            
                                console.log('onChange', jsonValue); }}
						/>
						
						<Grid container spacing={2}>	
							<Grid item xs={6}>
								<Button variant="contained" onClick={json2Xml}>JSON to XML</Button>
							</Grid>
                            <Grid item xs={6}>
								
								<Grid container spacing={2}>	
									<Grid item xs={6}>
										<Button variant="contained" disabled={jsonValue.length <= 0} onClick={() => {
											navigator.clipboard.writeText(jsonValue);											
											setIsJsonCopied(true);
										}}>
											<ContentCopyIcon />Copy
										</Button>
									</Grid>
									<Grid item xs={6}>
										{ isJsonCopied ? (<Chip label="Successful" color="success" icon={<DoneIcon />} />) : '' }
									</Grid>
								</Grid>
							</Grid>
						</Grid>

					</Grid>
					<Grid item xs={6}>
                        <h2>XML data</h2>
						<TextareaAutosize
							minRows={3}
							style={{ width: '100%', height: '60vh', overflow: 'auto' }}					
							value={xmlValue}
							onChange={(e) => { setXmlValue(e.target.value) }}
						/>
                        
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Button variant="contained" onClick={xml2Json}>XML to JSON</Button>
							</Grid>
							<Grid item xs={6}>
								<Grid container spacing={2}>					
									<Grid item xs={6}>
										<Button 
												variant="contained" 
												onClick={() => {
													navigator.clipboard.writeText(xmlValue);
													setIsXmlCopied(true);
												}} 
												disabled={xmlValue.length <= 0}>
											<ContentCopyIcon />Copy
										</Button>
									</Grid>
									<Grid item xs={6}>
										{ isXmlCopied ? (<Chip label="Successful" color="success" icon={<DoneIcon />} />) : '' }
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

			</Container>
		</React.Fragment>
	);
}

export default JSONConverter;
