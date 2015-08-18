function AddVehicleFormValidate()
{
	var curForm=document.forms["addVehicle"];
	/* no check is made for name field, since it is going to be taken from sesssion*/

	if(curForm["vtype"].value!=1&&curForm["vtype"].value!=2)
	{
		alert("undefined vehicle type");
		return false;
	}

	if(/^[A-Za-z0-9\s]+$/.test(curForm["vno"].value)==false||curForm["vno"].value.match(/\b\d{4}\b/g)==null)
	{
		alert("Enter valid vehicle number");
		return false;
	}
	return true;
}