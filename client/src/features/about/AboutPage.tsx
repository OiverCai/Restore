import {  Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
    const [validationErrors , setValidationErrors] = useState<string []>([]);

    function getValidationError(){
        agent.TestErrors.getValidationError()
                        .then(()=>console.log('should not see this'))
                        .catch(error => {setValidationErrors(error);});
    }

    return (
        <Container>
         <Typography gutterBottom  variant="h2" > Page for error testing  </Typography> 
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={()=>agent.TestErrors.get400Error().catch(error => console.log(error) )}>Test 400</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get401Error().catch(error => console.log(error) )}>Test 401</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get404Error().catch(error => console.log(error) )}>Test 404</Button>
                <Button variant='contained' onClick={()=>agent.TestErrors.get500Error().catch(error => console.log(error) )}>Test 500</Button>
                <Button variant='contained' onClick={getValidationError}>Test validation error</Button>
            </ButtonGroup>
            {
                validationErrors.length > 0 && 
                <Alert severity='error'>
                    <AlertTitle>validation Error</AlertTitle>
                    <List>
                        {validationErrors.map((error,index) => <ListItem key={index} >{error}</ListItem>)}
                    </List>
                </Alert>
            }      
        </Container>

    )
};
