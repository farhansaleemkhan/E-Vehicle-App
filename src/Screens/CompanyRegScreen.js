import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import Success from '../Components/Success';

const FormStep1 = ({ nextStep }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess]=useState();

    const isFormComplete = () => {
        return (
          name !== '' &&
          email !== '' &&
          phoneNo !== '' &&
          password !== '' &&
          cpassword !== ''
        );
      };
    
    function myFunction() {
        let x = document.getElementById("myInput");
        let y = document.getElementById("myinput")
        if (x.type === "password" && y.type === 'password') {
          x.type = "text";
          y.type = "text";
        } else {
          x.type = "password";
          y.type = "password";
        }
      }

    const Register = async ()=>{
        if (password === cpassword && password.length>8) {
            const user = {
                name,
                email,
                phoneNo,
                password,
                cpassword
            };
            try {
                setLoading(true);
                // const result = (await axios.post('/api/User/register', user)).data;
                setLoading(false);
                setSuccess(true);
                setName('')
                setEmail('')
                setPhoneNo('')
                setPassword('')
                setCpassword('')
                // window.location.href='/login';
            } catch (error) {
                setLoading(false);
                setError(true);
                console.log(error)
            }
        }
        else {
            alert("Password not Match");
        }
    }

    return (
        <div>
            {loading && (<Loader />)}
            <div className='row justify-content-center m-5'>
                <div className='col-md-5 shadow mt-5'>
                    {/* {error && (<Error message="Something went wrong, Please try again later." />)} */}
                    {/* {success && (<Success message='Register Successfully' />)} */}
                    <input type='text' className='form-control' placeholder='Enter Name' value={name} onChange={(e) => { setName(e.target.value); } } required></input><br />
                    <input type='email' className='form-control' placeholder='Enter Email' value={email} onChange={(e) => { setEmail(e.target.value); } } required></input><br />
                    <input type='tel' className='form-control' placeholder='Enter Phone Number' value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value); } } required></input><br />
                    <input type='password' className='form-control' id='myInput' placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value); } } required /><br />
                    <input type='password' className='form-control' id='myinput' placeholder='Confirm Password' value={cpassword} onChange={(e) => { setCpassword(e.target.value); } } required /><br />
                    <input type="checkbox" onClick={myFunction} />Show Password<br />
                    <button className='btn btn-primary m-3' onClick={Register}>Register</button>
                    <button className='btn btn-success m-4' disabled={!isFormComplete()} onClick={nextStep}>Next</button>
                </div>
            </div>
        </div>
    );
};

const FormStep2 = ({ nextStep, prevStep }) => {
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyTVehicle, setCompanyTVehicle] = useState('');
    const [companyTEmployee, setCompanyTEmployee] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess]=useState();
        
    const Register = async ()=>{
      const user = {
        companyName,
        companyAddress,
        companyTVehicle,
        companyTEmployee
      }
        try {
          setLoading(true);
          // const result = (await axios.post('/api/User/companyregister', user)).data;
          setLoading(false);
          setSuccess(true);
          setCompanyName('')
          setCompanyAddress('')
          setCompanyTVehicle('')
          setCompanyTEmployee('')
          // window.location.href='/login';
          } catch (error) {
            setLoading(false);
            setError(true);
            console.log(error)
            }
    }

    return (
        <div>
            {loading && (<Loader />)}
            <div className='row justify-content-center m-5'>
                <div className='col-md-5 shadow mt-5'>
                    {error && (<Error message="Something went wrong, Please try again later." />)}
                    {success && (<Success message='Register Successfully' />)}
                    <input type='text' className='form-control' placeholder='Enter Company Name' value={companyName} onChange={(e) => { setCompanyName(e.target.value); } } required></input><br />
                    <input type='text' className='form-control' placeholder='Enter Company Address' value={companyAddress} onChange={(e) => { setCompanyAddress(e.target.value); } } required></input><br />
                    <input type='number' className='form-control' placeholder='Enter Company Total Vehicles' value={companyTVehicle} onChange={(e) => { setCompanyTVehicle(e.target.value); } } required></input><br />
                    <input type='number' className='form-control' placeholder='Enter Company Total Employees' value={companyTEmployee} onChange={(e) => { setCompanyTEmployee(e.target.value); } } required /><br />
                    <button className='btn btn-primary m-3' onClick={Register}>Register</button>
                    <button className='btn btn-primary m-3' onClick={prevStep}>Previous</button>
                    <button className='btn btn-primary m-3' onClick={nextStep}>Next</button>
                </div>
            </div>
        </div>
    )
};

const FormStep3 = ({ formData, setFormData, prevStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, step3: e.target.value });
  };

  return (
    <div>
      <h2>Step 3</h2>
      <input type="text" value={formData.step3} onChange={handleChange} />
      <button onClick={prevStep}>Previous</button>
      <button>Submit</button>
    </div>
  );
};

const CompanyRegScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step2: '',
    step3: '',
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStep1 nextStep={nextStep} />
        );
      case 2:
        return (
          <FormStep2
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <FormStep3
            setFormData={setFormData}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className='mt-5' style={{textAlign: "center"}}>Register Company</h1>
      {renderFormStep()}
    </div>
  );
};

export default CompanyRegScreen;




// import React, {useState} from 'react';
// import axios from 'axios';
// import Loader from '../Components/Loader';
// import Error from '../Components/Error';
// import Success from '../Components/Success';

// const CompanyRegScreen = () => {
//     const [companyName, setCompanyName] = useState('');
//     const [companyAddress, setCompanyAddress] = useState('');
//     const [companyTVehicle, setCompanyTVehicle] = useState('');
//     const [companyTEmployee, setCompanyTEmployee] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState();
//     const [success, setSuccess]=useState();
        
//     const Register = async ()=>{
//       const user = {
//         companyName,
//         companyAddress,
//         companyTVehicle,
//         companyTEmployee
//       }
//         try {
//           setLoading(true);
//           // const result = (await axios.post('/api/User/companyregister', user)).data;
//           setLoading(false);
//           setSuccess(true);
//           setCompanyName('')
//           setCompanyAddress('')
//           setCompanyTVehicle('')
//           setCompanyTEmployee('')
//           // window.location.href='/login';
//           } catch (error) {
//             setLoading(false);
//             setError(true);
//             console.log(error)
//             }
//     }

//     return (
//         <div>
//             {loading && (<Loader />)}
//             <div className='row justify-content-center m-5'>
//                 <div className='col-md-5 shadow mt-5'>
//                     {error && (<Error message="Something went wrong, Please try again later." />)}
//                     {success && (<Success message='Register Successfully' />)}
//                     <h2>Register Company</h2>
//                     <input type='text' className='form-control' placeholder='Enter Company Name' value={companyName} onChange={(e) => { setCompanyName(e.target.value); } } required></input><br />
//                     <input type='text' className='form-control' placeholder='Enter Company Address' value={companyAddress} onChange={(e) => { setCompanyAddress(e.target.value); } } required></input><br />
//                     <input type='number' className='form-control' placeholder='Enter Company Total Vehicles' value={companyTVehicle} onChange={(e) => { setCompanyTVehicle(e.target.value); } } required></input><br />
//                     <input type='number' className='form-control' placeholder='Enter Company Total Employees' value={companyTEmployee} onChange={(e) => { setCompanyTEmployee(e.target.value); } } required /><br />
//                     <button className='btn btn-primary m-3' onClick={Register}>Register</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CompanyRegScreen;