import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Paper from '@mui/material/Paper';

function JSONConverter() {
	
	const [value, setValue] = React.useState('text');
	const [value2, setValue2] = React.useState('');

	const handleChange = (event) => {
		setValue(event.target.value);
	 };


	const formatJSON = () => {
		try {
			var a = JSON.parse(value);
			setValue2(JSON.stringify(a, null, 4));
		} catch(e) {
			alert('not JSON format');
		}
	}
	
	const minifyJSON = () => {
		try {
			var a = JSON.parse(value);
			setValue2(JSON.stringify(a));
		} catch(e) {
			alert('not JSON format');
		}
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="xl" fixed>
				<h1>JSON lint</h1>
				
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextareaAutosize
							aria-label="paste text here"
							minRows={3}
							placeholder="paste text here..."
							style={{ width: '100%', height: '60vh' }}					
							value={value}
							onChange={handleChange}
						/>
						
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Button variant="contained" onClick={formatJSON}>Format JSON</Button>
							</Grid>
							<Grid item xs={6}>
								<Button variant="contained" onClick={minifyJSON}>minify JSON</Button>
							</Grid>
						</Grid>

					</Grid>
					<Grid item xs={6}>
						<pre>{value2}</pre>
					</Grid>
				</Grid>

			</Container>
		</React.Fragment>
	);
}

export default JSONConverter;
