import * as React from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';


function XMLConverter() {
	
    const format = require('xml-formatter');

	const [valueBefore, setValueBefore] = React.useState('<xml>abc <a>123</a> <b>abc</b></xml>');
	const [valueAfter, setValueAfter] = React.useState('');
	const [isCopied, setIsCopied] = React.useState(false);

	const handleChange = (event) => {
        console.log('value', event)
		setValueBefore(event.target.value);
		setIsCopied(false);
	};

	const formatXML = () => {
		try {
			const xml = format(valueBefore);
			setValueAfter(xml);
			setIsCopied(false);
		} catch(e) {
            console.log('error', e)
			alert('not XML format');
		}
	}
	
	const minifyXML = () => {
		try {
            const xml = format(valueBefore);
            var formattedXml = format(xml, {
                indentation: '',
                collapseContent: true,
                lineSeparator: ''
            });
			setValueAfter(formattedXml);
			setIsCopied(false);
		} catch(e) {
            console.log('error', e)
			alert('not XML format');
		}
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="xl" fixed>
				<h1>XML lint</h1>
				
				<Grid container spacing={2}>
					<Grid item xs={6}>
                        <h2>Raw text</h2>
						<TextareaAutosize
							aria-label="paste text here"
							minRows={3}
							placeholder="paste text here..."
							style={{ width: '100%', height: '60vh', overflow: 'auto' }}					
							value={valueBefore}
							onChange={handleChange}
						/>
						
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Button variant="contained" onClick={formatXML}>Format XML</Button>
							</Grid>
							<Grid item xs={6}>
								<Button variant="contained" onClick={minifyXML}>minify XML</Button>
							</Grid>
						</Grid>

					</Grid>
					<Grid item xs={6}>
                        <h2>Formatted text</h2>
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

			</Container>
		</React.Fragment>
	);
}

export default XMLConverter;
