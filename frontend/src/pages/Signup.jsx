import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import {Button} from "../components/Button";
import InputBox from "../components/InputBox";
import {BottomWarning} from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signup() {
	const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });
    const navigate = useNavigate();
	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
	const handleClick = async ()=>{
		const response = await axios.post("http://127.0.0.1:3000/api/v1/user/signup",{
			firstName:formData.firstName,
			lastName:formData.lastName, 
			username:formData.username,
			password:formData.password
		})
		localStorage.setItem("token",response.data.token);
		navigate("/dashboard");
	}
	return (
		<div className="bg-slate-300 h-screen flex justify-center">
			<div className="flex flex-col justify-center">
				<div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
					<Heading label={"Sign up"} />
					<SubHeading
						label={"Enter your infromation to create an account"}
					/>
					<InputBox 
						name={"firstName"} 
						onChange={handleChange} 
						placeholder="John" 
						label={"First Name"} 
					/>
					<InputBox 
						name={"lastName"} 
						onChange={handleChange} 
						placeholder="Doe" 
						label={"Last Name"} 
					/>
					<InputBox
						name={"username"}
						onChange={handleChange}
						placeholder="sagar@gmail.com"
						label={"Email"}
					/>
					<InputBox 
						name={"password"}
						onChange={handleChange} 
						placeholder="123456" 
						label={"Password"} 
					/>
					<div className="pt-4">
						<Button 
							label={"Sign up"} 
							onClick={handleClick}
						/>
					</div>
					<BottomWarning
						label={"Already have an account?"}
						buttonText={"Sign in"}
						to={"/signin"}
					/>
				</div>
			</div>
		</div>
	);
}
