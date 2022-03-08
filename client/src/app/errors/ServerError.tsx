import { Container, Paper, Typography,Divider, Button } from "@mui/material";
import { useLocation, useNavigate  } from "react-router-dom";

export default function ServerError() {
    const navigator = useNavigate();
    const location = useLocation() ;   
    //v6的版本吧useLocation的泛型去掉了
    
    interface LocationState {
        title? : string, 
        detail?: string,
        status ? : string
    };
    const state  = location.state as LocationState ;
    console.log(state);
    
        return (
            <Container component={Paper}>
                {state ? (
                    <>
                        <Typography variant="h3" color='error' gutterBottom>{state.title+ "  "}  {state.status}</Typography>
                        <Divider />
                        <Typography >{state.detail || "internal server error"}</Typography>
                    </>
                ) :(
                    <Typography variant="h5" gutterBottom>Server Error </Typography>
                )
                }
                <Button onClick={ ()=>{navigator ('../catalog',{ replace: true })}}>Go back to the store</Button>
            </Container>
        )
};
