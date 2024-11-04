	  
	  // set php file

	function set_phpfilename(){

	    this.phpfilename = 'php/backend.php';
	}


 
	 // set php file





 function createCompanyDetails (){


  var company_name = $.trim($("#companyname").val()); 
  var company_city = $.trim($("#cityname").val()); 
  var company_state = $("#statename").val();
  var company_zip = $.trim($("#zipname").val());
  var company_email = $.trim($("#emailname").val()); 
  var company_phone = $.trim($("#phonename").val());
  var company_address= $.trim($("#addressname").val()); 
  var company_pricing = $.trim($("#pricingname").val()); 
  var company_auth = $.trim($("#authorityname").val());   
  var call_fn = 'createCompanyDetailsphp'; 
   
// alert(companyemail);

 if (company_name =='' || company_city =='' || company_state =='' || company_email =='' || company_phone =='') {


          // if not checked 
          $("#labelcompanyerror").text('Fill all fields marked with *');
          document.getElementById("companysuccesserror").style.display = "block";



  } else { 

// alert(companyname);

        $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&company_name=' + company_name+ '&company_city=' + company_city+ '&company_state=' + company_state+
         '&company_zip=' + company_zip+ '&company_email=' + company_email+ '&company_phone=' + company_phone+ 
         '&company_address=' + company_address+ '&company_pricing=' + company_pricing+ '&company_auth=' + company_auth+ '&call_fn=' + call_fn,

        success: function(response){


          if (response.indexOf('success') !== -1) {

              document.getElementById("companysuccessalert").style.display = "block"; 
              resetCompanyDetails();
              // document.getElementById("companylogoname").value = getCompanyDetails ('company_name',company_email);
              // document.getElementById("hiddencompanyid").value = getCompanyDetails ('company_id',company_email);

          }
          
      

        },
        error: function(jqXHR, textStatus, errorThrown){
          alert(jqXHR.status);
          alert(errorThrown);
          alert(textStatus);


        }         
        });



}

            

}// createCompanyDetails








   function resetCompanyDetails(){
  
 
  document.getElementById('companyname').value = '';
  document.getElementById('cityname').value = '';
  document.getElementById('statename').value = '';
  document.getElementById('zipname').value = '';
  document.getElementById('emailname').value = '';
  document.getElementById('phonename').value = '';
  document.getElementById('addressname').value = '';
  document.getElementById('pricingname').value = ''; 
  document.getElementById('authorityname').value = '';    


  }// resetCompanyDetails


     function setCompanyDetails(){
  
 
  document.getElementById('companylogoname').value = '';
  document.getElementById('hiddencompanyid').value = ''; 


  }// setCompanyDetails



function getCompanyDetails (selectcol,company_email){
  
  var call_fn ='get_CompanyDetailsphp';
 

  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&company_email=' + company_email+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;

  
}// getCompanyDetails



function getCompanyCount (){
  
  var call_fn ='get_CompanyCountphp';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;

  
}// getCompanyCount



function getRequestCount (){
  
  var call_fn ='getRequestCountphp';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;

  
}// getRequestCount




function getallCompany(){

   
    var call_fn = 'getallCompanyphp'; 
   


         $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&call_fn=' + call_fn,
        success: function(response){


         $(getallcompanylist).html(response); 


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }         
      });

            

}// getallCompany



function getallCompanyPostings(){

   
    var call_fn = 'getallCompanyPostingsphp'; 
   


         $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&call_fn=' + call_fn,
        success: function(response){


         $(getallcompanylist).html(response); 


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }         
      });

            

}// getallCompanyPostings





function getallJobList(){

   
    var call_fn = 'getallJobListphp'; 
   


         $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&call_fn=' + call_fn,
        success: function(response){


         $(getallcompanylist).html(response); 


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }         
      });

            

}// getallJobList





function getallRequestCompany(){

   
    var call_fn = 'getallRequestCompanyphp'; 
   


         $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&call_fn=' + call_fn,
        success: function(response){


         $(getallcompanylist).html(response); 


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }         
      });

            

}






 function uploadCompanyLogo (){


    var company_id = $.trim($("#hiddencompanyid").val());
    var call_fn = 'uploadCompanyLogophp'; 
    var image_file =document.getElementById("uploadlogobutton").files[0].name;


      $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&company_id=' + company_id+ '&image_file=' + image_file+ '&call_fn=' + call_fn,
        success: function(response){

        document.getElementById("logosuccessalert").style.display = "block";


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }         
      });

            

}// uploadCompanyLogo



 function createUserDetails (){


  var user_firstname = $.trim($("#userfirstname").val()); 
  var user_lastname = $.trim($("#userlastname").val()); 
  var user_middlename = $("#usermiddlename").val();
  var user_email = $.trim($("#useremail").val());
  var user_phone = $.trim($("#userphone").val()); 
  var user_city = $.trim($("#usercity").val());
  var user_state= $.trim($("#userstate").val()); 
  var user_address= $.trim($("#useraddress").val());   
  var user_deactivate = 'N'; 
  var call_fn = 'createCompanyDetailsphp'; 

         if (document.getElementById('userdeactivate').checked) { 

                        user_deactivate = 'Y'; 

                      } else {   

						user_deactivate = 'N'; 

            } 
   


 if (user_firstname =='' || user_lastname =='' || user_email =='' || user_phone =='') {


          // if not checked 
          $("#labelcompanyerror").text('Fill all fields marked with *');
          document.getElementById("companysuccesserror").style.display = "block";



  } else { 

// alert(companyname);

        $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&company_name=' + company_name+ '&company_city=' + company_city+ '&company_state=' + company_state+
         '&company_zip=' + company_zip+ '&company_email=' + company_email+ '&company_phone=' + company_phone+ 
         '&company_address=' + company_address+ '&company_pricing=' + company_pricing+ '&company_auth=' + company_auth+ '&call_fn=' + call_fn,

        success: function(response){


          if (response.indexOf('success') !== -1) {

              document.getElementById("companysuccessalert").style.display = "block"; 
              resetCompanyDetails();
              // document.getElementById("companylogoname").value = getCompanyDetails ('company_name',company_email);
              // document.getElementById("hiddencompanyid").value = getCompanyDetails ('company_id',company_email);

          }
          
      

        },
        error: function(jqXHR, textStatus, errorThrown){
          alert(jqXHR.status);
          alert(errorThrown);
          alert(textStatus);


        }         
        });



}

            

}// createUserDetails



 function selectcompanyId(editid) {
   

   sessionStorage.setItem('company_id', editid);

   // alert(editid);
 
    document.getElementById("passwdsuccessalert").style.display = "none";
    document.getElementById("companysuccessalert").style.display = "none";
    document.getElementById("companysuccesserror").style.display = "none"; 
   
    $("#viewcompanyname").text(getCompanyDetails ('company_name',editid));



    var company_name  = getCompanyDetails ('company_name',editid); 
    var company_city  = getCompanyDetails ('company_city',editid);
    var company_state  = getCompanyDetails ('company_state',editid);
    var company_zip  = getCompanyDetails ('company_zip',editid);
    var company_email = getCompanyDetails ('company_email',editid);
    var company_phone  = getCompanyDetails ('company_phone',editid);
    var company_address  = getCompanyDetails ('company_address',editid);
    var company_pricing  = getCompanyDetails ('company_pricing',editid);
    var company_allowed  = getCompanyDetails ('company_allowed',editid);
    // var company_allowed  = 'Y';



    document.getElementById("viewcityname").value = company_city;
    document.getElementById("viewstatename").value = company_state;
    document.getElementById("viewzipname").value = company_zip;
    document.getElementById("viewemailname").value = company_email;
    document.getElementById("viewphonename").value = company_phone;
    document.getElementById("viewaddressname").value = company_address;
    document.getElementById("viewpricingname").value = company_pricing;

    if (company_allowed.indexOf('Y') !== -1) {

       document.getElementById("viewauthorityname").value = 'Access granted';

    } else {

      document.getElementById("viewauthorityname").value = 'Access denied';

    }


    document.getElementById("editcompanyname").value = company_name;
    document.getElementById("editcityname").value = company_city;
    document.getElementById("editstatename").value = company_state;
    document.getElementById("editzipname").value = company_zip;
    document.getElementById("editemailname").value = company_email;
    document.getElementById("editphonename").value = company_phone;
    document.getElementById("editaddressname").value = company_address;
   

// alert(company_allowed,editid);
    //Select item
    var listbox = document.getElementById("editauthorityname");
    
      if (company_allowed.indexOf('Y') !== -1) {

          company_allowed  = 'Allow';

        } else {

          company_allowed  = 'Block';

        }


    for (var i = 0; i < listbox.options.length; ++i) {
    
    if (listbox.options[i].text == company_allowed) listbox.options[i].selected = true ;  
    
    }

    //Select item
   
   
}// selectcompanyId






 function selectpostingcompanyId(editid) {
   

   sessionStorage.setItem('company_id', editid);   

    $("#jobcompanyname").text(getCompanyDetails ('company_name',editid));
   
}// selectpostingcompanyId





 function selectrequestcompanyId(editid) {
   

   sessionStorage.setItem('company_id', editid);
    document.getElementById("companysuccessalert").style.display = "none";
    document.getElementById("companysuccesserror").style.display = "none"; 


    var company_name  = getRequestCompanyDetails ('request_companyname',editid); 
    var company_phone  = getRequestCompanyDetails ('request_companyphone',editid);
    var company_email  = getRequestCompanyDetails ('request_companyemail',editid);
    var company_address  = getRequestCompanyDetails ('request_companyaddress',editid);

    // var company_allowed  = 'Y';



    document.getElementById("editcompanyname").value = company_name;
    document.getElementById("editphonename").value = company_phone;
    document.getElementById("editemailname").value = company_email;
    document.getElementById("editaddressname").value = company_address;  


   
}// selectrequestcompanyId




function selectjobId(editid) {
   

   sessionStorage.setItem('company_id', editid);

   // alert(editid);
 

    document.getElementById("companysuccessalert").style.display = "none";
    document.getElementById("companysuccesserror").style.display = "none"; 
   
 



    var job_title  = getJobDetails ('job_title',editid); 
    var job_summary  = getJobDetails ('job_summary',editid);
    var job_location  = getJobDetails ('job_location',editid);
    var job_dateposted  = getJobDateDetails ('job_dateposted',editid);
    var job_datedeadline = getJobDateDetails ('job_datedeadline',editid);
    // var job_details  = getJobDetails ('job_details',editid);


    for (instance in CKEDITOR.instances){
                 CKEDITOR.instances[instance].setData(getJobDetails ('job_details',editid));
              }




    document.getElementById("jobTitle").value = job_title;
    document.getElementById("jobSummary").value = job_summary;
    document.getElementById("jobLocation").value = job_location;
    document.getElementById("datetimepicker4").value = job_dateposted;
    document.getElementById("datetimepicker5").value = job_dateposted;



 

   
}// selectjobId





function getCompanyDetails (selectcol,companyId){
  
   // alert('');
  var call_fn ='getCompanyDetailsphp';
  

  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&companyId=' + companyId+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;

  
}// getCompanyDetails





function getJobDetails (selectcol,jobId){
  
   // alert('');
  var call_fn ='getJobDetailsphp';
  

  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&jobId=' + jobId+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;

  
}// getCompanyDetails





function getJobDateDetails (selectcol,jobId){
  
   // alert('');
  var call_fn ='getJobDateDetailsphp';
  

  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&jobId=' + jobId+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;

  
}// getJobDateDetails




function getRequestCompanyDetails (selectcol,companyId){
  
   // alert('');
  var call_fn ='getRequestCompanyDetailsphp';
  

  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&companyId=' + companyId+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;

  
}// getRequestCompanyDetails






 function editCompanyDetails (){


  var company_name = $.trim($("#editcompanyname").val()); 
  var company_city = $.trim($("#editcityname").val()); 
  var company_state = $("#editstatename").val();
  var company_zip = $.trim($("#editzipname").val());
  var company_email = $.trim($("#editemailname").val()); 
  var company_phone = $.trim($("#editphonename").val());
  var company_address= $.trim($("#editaddressname").val()); 
  var company_pricing = $.trim($("#editpricingname").val()); 
  var company_auth = $.trim($("#editauthorityname").val());   
  var call_fn = 'editCompanyDetailsphp'; 
  var company_id = sessionStorage.getItem('company_id');
   
// alert(companyemail);

 if (company_name =='' || company_city =='' || company_state =='' || company_email =='' || company_phone =='') {


          // if not checked 
          $("#labelcompanyerror").text('Fill all fields marked with *');
          document.getElementById("companysuccesserror").style.display = "block";



  } else { 


  if (company_auth.indexOf('Allow') !== -1) {

       company_auth = 'Y';

    } else {

      company_auth = 'N';

    }



        $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&company_name=' + company_name+ '&company_city=' + company_city+ '&company_state=' + company_state+
         '&company_zip=' + company_zip+ '&company_email=' + company_email+ '&company_phone=' + company_phone+ 
         '&company_address=' + company_address+ '&company_pricing=' + company_pricing+ 
         '&company_auth=' + company_auth+ '&company_id=' + company_id+ '&call_fn=' + call_fn,

        success: function(response){


          if (response.indexOf('success') !== -1) {

              document.getElementById("companysuccessalert").style.display = "block"; 
        

          }
          
      

        },
        error: function(jqXHR, textStatus, errorThrown){
          alert(jqXHR.status);
          alert(errorThrown);
          alert(textStatus);


        }         
        });



}

            

}// editCompanyDetails





 function enterCompanyRequest (){



  var company_pricing = $.trim($("#editpricingname").val()); 
  var company_auth = $.trim($("#editauthorityname").val());  
  var company_id = sessionStorage.getItem('company_id'); 
  var company_email = $.trim($("#editemailname").val()); 
  var call_fn = 'enterCompanyRequestphp'; 
   



  if (company_auth.indexOf('Allow') !== -1) {

       company_auth = 'Y';

    } else {

      company_auth = 'N';

    }

// alert(company_email);

        $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&company_pricing=' + company_pricing+ '&company_email=' + company_email+
         '&company_auth=' + company_auth+ '&company_id=' + company_id+ '&call_fn=' + call_fn,

        success: function(response){


          if (response.indexOf('success') !== -1) {

              document.getElementById("companysuccessalert").style.display = "block";  
              updateCompanyRequestStatus(); 
              getallRequestCompany();


          } else if (response.indexOf('failed') !== -1){

          $("#labelcompanyerror").text('Request processing failed');
          document.getElementById("companysuccesserror").style.display = "block";


          } else if (response.indexOf('exists') !== -1){

         document.getElementById("companysuccessalert").style.display = "block";  
         updateCompanyRequestStatus();
         getallRequestCompany();

          }
          
      

        },
        error: function(jqXHR, textStatus, errorThrown){
          alert(jqXHR.status);
          alert(errorThrown);
          alert(textStatus);


        }         
        });




            

}// enterCompanyRequest





 function editCompanyPasswd(){



  var call_fn = 'editCompanyPasswdphp'; 
  var company_id = sessionStorage.getItem('company_id');

   

        $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&company_id=' + company_id+ '&call_fn=' + call_fn,

        success: function(response){


          if (response.indexOf('success') !== -1) {

              document.getElementById("resetCompanyPasswd").style.display = "block"; 
        

          }
          
      

        },
        error: function(jqXHR, textStatus, errorThrown){
          alert(jqXHR.status);
          alert(errorThrown);
          alert(textStatus);


        }         
        });



            

}//editCompanyPasswd





 function createNotification (){


  var notification_msg = $.trim($("#notificationmsg").val()); 
  var call_fn = 'createNotificationphp'; 
   



 if (!(notification_msg =='')) {



        $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&notification_msg=' + notification_msg+ '&call_fn=' + call_fn,

        success: function(response){


          if (response.indexOf('success') !== -1) {

            document.getElementById('notificationmsg').value = '';  
            getallNotifications(); 
             // alert('Message Sent Success');  


          } else {

           alert('Message Sent Failed'); 

          }
          
      

        },
        error: function(jqXHR, textStatus, errorThrown){
          alert(jqXHR.status);
          alert(errorThrown);
          alert(textStatus);


        }         
        });



}

            

}// createNotification



function getallNotifications(){

   
    var call_fn = 'getallNotificationsphp'; 
   


         $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&call_fn=' + call_fn,
        success: function(response){


         $(notificationsmessages).html(response); 


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }         
      });

            

} //getallNotifications






 function updateCompanyRequestStatus (){



  var call_fn = 'updateCompanyRequestStatusphp'; 
  var request_id = sessionStorage.getItem('company_id');

// alert(request_id);
   

        $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&request_id=' + request_id+ '&call_fn=' + call_fn,

        success: function(response){

          // if (response.indexOf('success') !== -1) {          
      

        },
        error: function(jqXHR, textStatus, errorThrown){
          alert(jqXHR.status);
          alert(errorThrown);
          alert(textStatus);


        }         
        });



            

}//updateCompanyRequestStatus



function getAppUsersCount (){
  
  var call_fn ='getAppUsersCountphp';


  var ticketid = $.ajax({


    url : 'php/mycvphp.php',
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;

  
}// getAppUsersCount





 function postCompanyJob (){

  var job_companyid = sessionStorage.getItem('company_id');
  var job_title = $.trim($("#jobTitle").val()); 
  var job_summary = $.trim($("#jobSummary").val()); 
  var job_location = $.trim($("#jobLocation").val()); 
  var job_dateposted = $.trim($("#datetimepicker4").val()); 
  var job_datedeadline= $("#datetimepicker5").val();
  var job_details = CKEDITOR.instances.editor1.getData();
      job_details = escape(job_details);
  var call_fn = 'postCompanyJobphp'; 
   




 if (job_title =='') {

// alert('companyname');
          // if not checked 
          $("#labelcompanyerror").text('Fields marked with * must be filled');
          document.getElementById("companysuccesserror").style.display = "block";
      


  } else { 



        $.ajax({
        url: phpfilename, 
        type: "POST",                             
        data: '&job_companyid=' + job_companyid+ '&job_title=' + job_title+ '&job_location=' + job_location+ '&job_summary=' + job_summary+ 
        '&job_dateposted=' + job_dateposted+ '&job_datedeadline=' + job_datedeadline+ '&job_details=' + job_details+ '&call_fn=' + call_fn,
        success: function(response){

// alert(response);
          if (response.indexOf('success') !== -1) {

// alert(job_details);
              document.getElementById("companysuccessalert").style.display = "block"; 
              resetPostJob();
              getallCompanyPostings();

          }
          
      

        },
        error: function(jqXHR, textStatus, errorThrown){
          alert(jqXHR.status);
          alert(errorThrown);
          alert(textStatus);


        }         
        });



}

            

} // postCompanyJob





    function resetPostJob(){
  
  for (instance in CKEDITOR.instances){
   CKEDITOR.instances[instance].setData(" ");
}
  document.getElementById('jobTitle').value = '';
  document.getElementById('jobLocation').value = '';
  document.getElementById('jobSummary').value = '';





  } // resetPostJob





  function getJobsCount (){
  
  var call_fn ='getJobsCountphp';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;

  
}// getJobsCount