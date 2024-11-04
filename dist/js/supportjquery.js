

this.phpfilename = './dist/php/support.php';


function selectAssetTicketNo(){

  var call_fn ='selectAssetTicketNophp';
   // alert(userId);

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


}  // checkcurrpasswd(userpassword)







  function fillassetClass (){


        var call_fn ='fillassetClassphp';

        $.ajax({

          url : phpfilename,
          type: "POST",
          data: '&call_fn=' + call_fn,
        success: function(data){

          // alert(data);

         $('#divclassname').html(data);


         }

});




  }   // empsignuponevalidation







    function enternewasset (){



  var assetticket = $.trim($("#ass_ticketno").val());
  var assetclass = $.trim($("#ass_class").val());
  var assetname = $.trim($("#ass_name").val());
  var assetdescrip = $.trim($("#ass_descrip").val());
  var assetmodelno = $.trim($("#ass_modelno").val());
  var assetserialno  = $.trim($("#ass_serialno").val());
  var assetlabelno = $.trim($("#ass_labelno").val());
  var assetstatus = $.trim($("#ass_status").val());
  var assetorg = sessionStorage.getItem('user_company');
  var assetstore =  sessionStorage.getItem('user_store');
  var assetcreatedby = sessionStorage.getItem('user_id');

  var call_fn = 'enternewassetphp';





 if (assetclass == ''|| assetname == ''|| assetmodelno == ''||
  assetserialno == ''|| assetstatus == '') {


  $("#warningmsg").text('Fields with * must be filled.');
  document.getElementById("warningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&assetticket=' + assetticket+ '&assetclass=' + assetclass+ '&assetname=' + assetname+
        '&assetdescrip=' + assetdescrip+ '&assetmodelno=' + assetmodelno
        + '&assetserialno=' + assetserialno+ '&assetlabelno=' + assetlabelno+  '&assetstatus=' + assetstatus+
         '&assetorg=' + assetorg+ '&assetstore=' + assetstore+ '&assetcreatedby=' + assetcreatedby+ '&call_fn=' + call_fn,
        success: function(response){

    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Asset entered successfully');
      document.getElementById("successmsg").style.display = "block";
       document.getElementById("warningmsg").style.display = "none";
      document.getElementById("ass_ticketno").value = selectAssetTicketNo();
      resetnewasset ();
      location.reload();
      //  emplistalljobs();


    } else {


     $("#warningmsg").text('Asset entry failed');
     document.getElementById("warningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation



function resetnewasset (){


  document.getElementById("ass_name").value = '';
  document.getElementById("ass_descrip").value = '';
  document.getElementById("ass_modelno").value = '';
  document.getElementById("ass_serialno").value = '';
  document.getElementById("ass_labelno").value = '';

 }





 function listallassets(company_id,store_id){


    var call_fn = 'listallassetsphp';
  
         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&company_id=' + company_id+'&store_id=' + store_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listassets').html(response);
          $('#tableassets').DataTable({
            // "bSort": false
            dom: 'Bfrtip',
            buttons: [
              'pageLength', 'excelHtml5', 'pdfHtml5', 'csvHtml5'
            ]
          });



      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()







function getIncAssetId(editid) {

  sessionStorage.setItem('asset_id', editid);

  var asset_class = selectAssetDetailsAsset ('trackass_class');
  document.getElementById("inc_class").value = asset_class;

}






  function fillincassetClass (){


        var call_fn ='fillincassetClassphp';

        $.ajax({

          url : phpfilename,
          type: "POST",
          data: '&call_fn=' + call_fn,
        success: function(data){

          // alert(data);

         $('#divincclassname').html(data);


         }

});




  }   // empsignuponevalidation





function selectAssetIncTicketNo(){

  var call_fn ='selectAssetIncTicketNophp';
   // alert(userId);

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


}  // checkcurrpasswd(userpassword)




 function getCurrentDate (){


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
}
if(mm<10){
    mm='0'+mm;
}
var today = dd+'/'+mm+'/'+yyyy;


  return today;


  }  // getCurrentDate







    function enternewassetinc (){



  var incidentticket = $.trim($("#inc_ticketno").val());
  var incidentcategory = $.trim($("#inc_category").val());
  var incidentclass = $.trim($("#inc_class").val());
  var incidenttype = $.trim($("#inc_type").val());
  var incidentpriority = $.trim($("#inc_priority").val());
  var incidentsubject  = $.trim($("#inc_subject").val());
  var incidentdescrip = $.trim($("#inc_descrip").val());
  var incidentduedate = $.trim($("#inc_duedate").val());
  var incidentorg = sessionStorage.getItem('user_company');
  var incidentstore = sessionStorage.getItem('user_store');
  var incidentcreatedby = sessionStorage.getItem('user_id');
  var incidentjobsahead = selectIncJobAhead(incidentorg,incidentduedate,incidentpriority);
  var incidentassetid = sessionStorage.getItem('asset_id');


  var call_fn = 'enternewassetincphp';



 if (incidentsubject == '') {


  $("#inc_warningmsg").text('Fields with * must be filled.');
  document.getElementById("inc_warningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&incidentticket=' + incidentticket+ '&incidentcategory=' + incidentcategory+ '&incidentclass=' + incidentclass+
        '&incidenttype=' + incidenttype+ '&incidentpriority=' + incidentpriority
        + '&incidentsubject=' + incidentsubject+ '&incidentdescrip=' + incidentdescrip+  '&incidentduedate=' + incidentduedate+
         '&incidentorg=' + incidentorg+ '&incidentstore=' + incidentstore+ '&incidentcreatedby=' + incidentcreatedby+
          '&incidentjobsahead=' + incidentjobsahead+ '&incidentassetid=' + incidentassetid+ '&call_fn=' + call_fn,
        success: function(response){

    if (response.indexOf('success') !== -1) {


      $("#inc_successmsg").text('Incident ticketed successfully');
      document.getElementById("inc_successmsg").style.display = "block";
       document.getElementById("inc_warningmsg").style.display = "none";
      document.getElementById("inc_ticketno").value = selectAssetIncTicketNo();
      resetnewassetinc ();
      location.reload();
      //  emplistalljobs();


    } else {


     $("#inc_warningmsg").text('Incident ticketing failed');
     document.getElementById("inc_warningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation



function selectIncJobAhead(company_id,duedate,priority){

  var call_fn ='selectIncJobAheadphp';
   // alert(userId);

  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&company_id=' + company_id+ '&duedate=' + duedate+ '&priority=' + priority+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


}  // checkcurrpasswd(userpassword)




function resetnewassetinc (){


  document.getElementById("inc_descrip").value = '';
  document.getElementById("inc_subject").value = '';

 }






 function selectIncAssetDetails(selectcol,selectid){

  var call_fn ='selectIncAssetDetailsphp';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&selectid=' + selectid+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


}  // checkcurrpasswd(userpassword)




 function selectIncAssetDetails(selectcol,selectid){

  var call_fn ='selectIncAssetDetailsphp';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&selectid=' + selectid+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


}  // checkcurrpasswd(userpassword)




 function listallmanageinc(company_id,store_id){


    var call_fn = 'listallmanageincphp';
   

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&company_id=' + company_id+'&store_id=' + store_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listincidences').html(response);


         var table = $('#tableassets').dataTable({
           // "bSort": false
             dom: 'Bfrtip',
             buttons: [
               'pageLength','excelHtml5', 'pdfHtml5', 'csvHtml5'
             ]
         });




      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()



function getViewInc(editid) {


  sessionStorage.setItem('incident_id', editid);

  var inc_ticket = selectIncidentDetails ('incident_ticketno');
  var asset_id = selectIncidentDetails ('incident_assetid');
  var asset_name = selectAssetDetails ('trackass_name',asset_id);
  var inc_subj = selectIncidentDetails ('incident_subject');
  var inc_descrip = selectIncidentDetails ('incident_narration');
  var inc_date = selectIncidentDate ('incident_date');
  var inc_requesterid = selectIncidentDetails ('incident_requesterid');
  var requester_name = selectUserName (inc_requesterid);
  var inc_jobahead = selectIncidentDetails ('incident_jobsahead');


   document.getElementById("inc_ticketno").value = inc_ticket;
   document.getElementById("inc_ticketname").value = asset_name;
   document.getElementById("inc_ticketsubj").value = inc_subj;
   document.getElementById("inc_ticketdescrip").value = inc_descrip;
   document.getElementById("inc_ticketdate").value = inc_date;
   document.getElementById("inc_ticketrequester").value = requester_name;
   document.getElementById("inc_ticketahead").value = inc_jobahead;


}



function getRemoveInc(editid) {


  sessionStorage.setItem('incident_id', editid);

}



// company details
function selectAssetDetailsAsset (selectcol){

  var call_fn ='selectAssetDetailsAssetphp';
  var asset_id = sessionStorage.getItem('asset_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details





// company details
function selectIncidentDetails (selectcol){

  var call_fn ='selectIncidentDetailsphp';
  var incident_id = sessionStorage.getItem('incident_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&incident_id=' + incident_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details




// company details
function selectAssetDetails (selectcol,assetid){

  var call_fn ='selectAssetDetailsphp';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&assetid=' + assetid+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details




// company details
function selectIncidentDate (selectcol){

  var call_fn ='selectIncidentDatephp';
  var incident_id = sessionStorage.getItem('incident_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&incident_id=' + incident_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details




// company details
function selectUserName (userid){

  var call_fn ='selectUserNamephp';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&userid=' + userid+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details




function deleteIncidence (){


    var call_fn ='deleteIncidencephp';
    var incident_id = sessionStorage.getItem('incident_id');



         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&incident_id=' + incident_id+'&call_fn=' + call_fn,
        success: function(response){


      location.reload();


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()




function enableColumns (tablename,idcol,rowid,updatecol,updateval){


    var call_fn ='enableColumnsphp';


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&tablename=' + tablename+'&rowid=' + rowid+'&idcol=' + idcol+'&updatecol=' + updatecol+'&updateval=' + updateval
        +'&call_fn=' + call_fn,
        success: function(response){





      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()




 function listmarkedjobs(){


    var call_fn = 'listmarkedjobsphp';
    var company_id = '1';

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&company_id=' + company_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listjobcard').html(response);


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()





function selectJobCardNo(){

  var call_fn ='selectJobCardNophp';
   // alert(userId);

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


}  // checkcurrpasswd(userpassword)





    function jobCardJob (){


  var jobcard_no = selectJobCardNo();
  sessionStorage.setItem('jobcardjob_no',jobcard_no);
  sessionStorage.setItem('store_company',selectStoreDetailsName ('store_company'));
  sessionStorage.setItem('store_name',selectStoreDetailsName ('store_name'));
  sessionStorage.setItem('store_addr',selectStoreDetailsName ('store_address'));
  sessionStorage.setItem('store_phone',selectStoreDetails ('store_phone'));
  sessionStorage.setItem('store_email',selectStoreDetails ('store_email'));
  sessionStorage.setItem('store_country',selectStoreDetailsName ('store_country'));

  var call_fn = 'jobCardJobphp';


  if (selectJobCardCount()>0) {




        $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&call_fn=' + call_fn,
        success: function(response){

              if (response.indexOf('success') !== -1) {

                  window.location.href = '/ItSupport/frontendjobcard.html';

              }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}




}   // empsignuponevalidation



// company details
function selectStoreDetails (selectcol){

  

  var store_id = sessionStorage.getItem('asset_id');
  var call_fn = 'selectStoreDetailsphp';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&store_id=' + store_id+ '&selectcol=' + selectcol+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


}




// company details
function selectStoreDetailsName (selectcol){

  var store_id ='1';
  var call_fn = 'selectStoreDetailsNamephp';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&store_id=' + store_id+ '&selectcol=' + selectcol+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


}




    function jobCardJobPrnt (){



        var call_fn ='jobCardJobPrntphp';

        $.ajax({

          url : phpfilename,
          type: "POST",
          data: '&call_fn=' + call_fn,
        success: function(data){

              if (response.indexOf('success') !== -1) {

                  window.location.href = '/ItSupport/frontendmanageincidence.html';

              }


         }

});


}   // empsignuponevalidation






function selectJobCardCount(){

  var call_fn ='selectJobCardCountphp';
  var store_id ='1';
   // alert(userId);

  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&store_id=' + store_id+'&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


}  // checkcurrpasswd(userpassword)





  function fillreqClass (){


        var call_fn ='fillreqClassphp';

        $.ajax({

          url : phpfilename,
          type: "POST",
          data: '&call_fn=' + call_fn,
        success: function(data){

          // alert(data);

         $('#divclassname').html(data);


         }

});




  }   // empsignuponevalidation





function selectReqTicketNo(){

  var call_fn ='selectReqTicketNophp';
   // alert(userId);

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


}  // checkcurrpasswd(userpassword)








    function enternewrequest (){



  var reqticket = $.trim($("#req_ticketno").val());
  var reqclass = $.trim($("#req_class").val());
  var reqitemname = $.trim($("#req_itemname").val());
  var reqqnty = $.trim($("#req_qnty").val());
  var reqtype = $.trim($("#req_type").val());
  var reqdescrip  = $.trim($("#req_descrip").val());
  var reqdatedue = $.trim($("#req_datedue").val());
  var reqorg = sessionStorage.getItem('user_company');
  var reqstore = sessionStorage.getItem('user_store');
  var reqcreatedby = sessionStorage.getItem('user_id');
  var req_currdate = getCurrentDate ();


  var call_fn = 'enternewrequestphp';





 if (reqitemname == ''|| reqqnty == '') {


  $("#warningmsg").text('Fields with * must be filled.');
  document.getElementById("warningmsg").style.display = "block";


} else if (!(compareDates (req_currdate,req_currdate))){

    $("#warningmsg").text('Selected deadline is invalid');
    document.getElementById("warningmsg").style.display = "block";



} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&reqticket=' + reqticket+ '&reqclass=' + reqclass+ '&reqitemname=' + reqitemname+
        '&reqqnty=' + reqqnty+ '&reqtype=' + reqtype
        + '&reqdescrip=' + reqdescrip+ '&reqdatedue=' + reqdatedue+  '&reqorg=' + reqorg+
         '&reqstore=' + reqstore+ '&reqcreatedby=' + reqcreatedby+ '&call_fn=' + call_fn,
        success: function(response){

    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Request sent successfully');
      document.getElementById("successmsg").style.display = "block";
       document.getElementById("warningmsg").style.display = "none";
      document.getElementById("req_ticketno").value = selectReqTicketNo();
      resetnewreq ();
      location.reload();
      //  emplistalljobs();


    } else {


     $("#warningmsg").text('Request sending failed');
     document.getElementById("warningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation





    function compareDates (deadlinedate,posteddate){



  if ((posteddate <= deadlinedate)==true) {

  return true;
    //alert('greater');

  }else if (deadlinedate < posteddate){

  return false;
  //alert('lesser');

  }



   }




function resetnewreq (){


  document.getElementById("req_itemname").value = '';
  document.getElementById("req_qnty").value = '';
  document.getElementById("req_descrip").value = '';
 }





 function listallrequests(company_id,store_id){


    var call_fn = 'listallrequestsphp';
 

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&store_id=' + store_id+'&company_id=' + company_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listrequests').html(response);
         $('#tablerequests').DataTable({
           // "bSort": false
           dom: 'Bfrtip',
           buttons: [
             'pageLength','excelHtml5', 'pdfHtml5', 'csvHtml5'
           ]
          });



      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()







    function editnewrequest (){



  var reqticket = $.trim($("#req_ticketno").val());
  var reqclass = $.trim($("#req_class").val());
  var reqitemname = $.trim($("#req_itemname").val());
  var reqqnty = $.trim($("#req_qnty").val());
  var reqtype = $.trim($("#req_type").val());
  var reqdescrip  = $.trim($("#req_descrip").val());
  var reqdatedue = $.trim($("#req_datedue").val());
  var reqorg ='1';
  var reqstore ='1';
  var reqcreatedby ='1';
  var req_currdate = getCurrentDate ();


  var call_fn = 'enternewrequestphp';





 if (reqitemname == ''|| reqqnty == '') {


  $("#warningmsg").text('Fields with * must be filled.');
  document.getElementById("warningmsg").style.display = "block";


} else if (!(compareDates (req_currdate,req_currdate))){

    $("#warningmsg").text('Selected deadline is invalid');
    document.getElementById("warningmsg").style.display = "block";



} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&reqticket=' + reqticket+ '&reqclass=' + reqclass+ '&reqitemname=' + reqitemname+
        '&reqqnty=' + reqqnty+ '&reqtype=' + reqtype
        + '&reqdescrip=' + reqdescrip+ '&reqdatedue=' + reqdatedue+  '&reqorg=' + reqorg+
         '&reqstore=' + reqstore+ '&reqcreatedby=' + reqcreatedby+ '&call_fn=' + call_fn,
        success: function(response){

    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Request sent successfully');
      document.getElementById("successmsg").style.display = "block";
       document.getElementById("warningmsg").style.display = "none";
      document.getElementById("req_ticketno").value = selectReqTicketNo();
      resetnewreq ();
      location.reload();
      //  emplistalljobs();


    } else {


     $("#warningmsg").text('Request sending failed');
     document.getElementById("warningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation





function getEditReq(editid) {


  sessionStorage.setItem('request_id', editid);

  var editreq_ticketno = selectRequestDetails ('request_ticketno');
  var editreq_class = selectRequestDetails ('request_itemclass');
  var editreq_itemname = selectRequestDetails ('request_itemname');
  var editreq_qnty = selectRequestDetails ('request_quantity');
  var editreq_type = selectRequestDetails ('request_type');
  var editreq_descrip = selectRequestDetails ('request_descrip');
  var editreq_datedue = selectRequestDate ('request_datedue');
  var editreq_requesterid = selectRequestDetails ('request_requesterid');
  var editreq_requestername= selectUserName (editreq_requesterid);


   document.getElementById("edit_ticketno").value = editreq_ticketno;
   document.getElementById("edit_class").value = editreq_class;
   document.getElementById("edit_itemname").value = editreq_itemname;
   document.getElementById("edit_qnty").value = editreq_qnty;
   document.getElementById("edit_type").value = editreq_type;
   document.getElementById("edit_descrip").value = editreq_descrip;
   document.getElementById("edit_datedue").value = editreq_datedue;
   document.getElementById("edit_requester").value = editreq_requestername;


}



function getRemoveReq(editid) {


  sessionStorage.setItem('request_id', editid);

}






// company details
function selectRequestDetails (selectcol){

  var call_fn ='selectRequestDetailsphp';
  var request_id = sessionStorage.getItem('request_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&request_id=' + request_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details





// company details
function selectRequestDate (selectcol){

  var call_fn ='selectRequestDatephp';
  var request_id = sessionStorage.getItem('request_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&request_id=' + request_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details






// company details
function selectUserName (userid){

  var call_fn ='selectUserNamephp';



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&userid=' + userid+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details





function deleteRequest (){


    var call_fn ='deleteRequestphp';
    var request_id = sessionStorage.getItem('request_id');



         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&request_id=' + request_id+'&call_fn=' + call_fn,
        success: function(response){


      location.reload();


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()




 function listallassetsentries(company_id,store_id){


    var call_fn = 'listallassetsentriesphp';


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&store_id=' + store_id+'&company_id=' + company_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listassetentries').html(response);
         $('#tableassets').DataTable({
           // "bSort": false
           dom: 'Bfrtip',
           buttons: [
             'pageLength','excelHtml5', 'pdfHtml5', 'csvHtml5'
           ]
          });



      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()





  function fillsendStore (){


        var call_fn ='fillsendStorephp';

        $.ajax({

          url : phpfilename,
          type: "POST",
          data: '&call_fn=' + call_fn,
        success: function(data){

          // alert(data);

         $('#divstorename').html(data);


         }

});




  }   // empsignuponevalidation





  function sendAssets(rowid){


        var to_company  = sessionStorage.getItem('store_company');
        var call_fn ='sendAssetsphp';


        if (to_company=='') {

          alert('Select company to send to');
        }

        $.ajax({

          url : phpfilename,
          type: "POST",
          data: '&to_company=' + to_company+'&rowid=' + rowid+'&call_fn=' + call_fn,
        success: function(data){

          // alert(data);




         }

});




  }   // empsignuponevalidation






    function unsendAssets(rowid){


        var to_company  = sessionStorage.getItem('store_company');
        var call_fn ='unsendAssetsphp';

        $.ajax({

          url : phpfilename,
          type: "POST",
          data: '&to_company=' + to_company+'&rowid=' + rowid+'&call_fn=' + call_fn,
        success: function(data){

          // alert(data);




         }

});




  }   // empsignuponevalidation





  function filleditassetClass (){


        var call_fn ='filleditassetClassphp';

        $.ajax({

          url : phpfilename,
          type: "POST",
          data: '&call_fn=' + call_fn,
        success: function(data){

          // alert(data);

         $('#edit_divclassname').html(data);


         }

});




  }   // empsignuponevalidation




// company details
function selectAssetDetailsTicket (selectcol,assetid){

  var call_fn ='selectAssetDetailsphp';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&assetid=' + assetid+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details




function getEditAsset(editid) {



  sessionStorage.setItem('asset_id', editid);

  var asset_ticketno = selectAssetDetailsAsset ('trackass_ticketno');
  var asset_class = selectAssetDetailsAsset ('trackass_class');
  var asset_name = selectAssetDetailsAsset ('trackass_name');
  var asset_descrip = selectAssetDetailsAsset ('trackass_descrip');
  var asset_modelno = selectAssetDetailsAsset ('trackass_modelno');
  var asset_serialno = selectAssetDetailsAsset ('trackass_serialno');
  var asset_labelno = selectAssetDetailsAsset ('trackass_labelno');
  var asset_status = selectAssetDetailsAsset ('trackass_status');



  var listbox = document.getElementById("edit_class");
  var searchtext = $.trim(asset_class);

  for (var i = 0; i < listbox.options.length; ++i) {

  if (listbox.options[i].text == searchtext) listbox.options[i].selected = true ;

  }



   document.getElementById("edit_ticketno").value = asset_ticketno;
   document.getElementById("edit_name").value = asset_name;
   document.getElementById("edit_descrip").value = asset_descrip;
   document.getElementById("edit_modelno").value = asset_modelno;

   document.getElementById("edit_serialno").value = asset_serialno;
   document.getElementById("edit_labelno").value = asset_labelno;


   listbox = document.getElementById("edit_status");
   searchtext = $.trim(asset_status);

  for (var i = 0; i < listbox.options.length; ++i) {

  if (listbox.options[i].text == searchtext) listbox.options[i].selected = true ;

  }






}









    function editnewasset (){



  var assetid = sessionStorage.getItem('asset_id');
  var assetclass = $.trim($("#edit_class").val());
  var assetname = $.trim($("#edit_name").val());
  var assetdescrip = $.trim($("#edit_descrip").val());
  var assetmodelno = $.trim($("#edit_modelno").val());
  var assetserialno  = $.trim($("#edit_serialno").val());
  var assetlabelno = $.trim($("#edit_labelno").val());
  var assetstatus = $.trim($("#edit_status").val());
  var assetcreatedby = sessionStorage.getItem('user_id');

  var call_fn = 'editnewassetphp';





 if (assetclass == ''|| assetname == ''|| assetmodelno == ''||
  assetserialno == ''|| assetstatus == '') {


  $("#edit_warningmsg").text('Fields with * must be filled.');
  document.getElementById("edit_warningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&assetid=' + assetid+ '&assetclass=' + assetclass+ '&assetname=' + assetname+
        '&assetdescrip=' + assetdescrip+ '&assetmodelno=' + assetmodelno
        + '&assetserialno=' + assetserialno+ '&assetlabelno=' + assetlabelno+  '&assetstatus=' + assetstatus+
         '&assetorg=' + assetorg+ '&assetstore=' + assetstore+ '&assetcreatedby=' + assetcreatedby+ '&call_fn=' + call_fn,
        success: function(response){

    if (response.indexOf('success') !== -1) {


      $("#edit_successmsg").text('Asset edited successfully');
      document.getElementById("edit_successmsg").style.display = "block";
      document.getElementById("edit_warningmsg").style.display = "none";
       location.reload();
      //  emplistalljobs();


    } else {


     $("#edit_warningmsg").text('Asset edit failed');
     document.getElementById("edit_warningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation





 function listallsentassets(store_id){


    var call_fn = 'listallsentassetsphp';
 


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&store_id=' + store_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listassetentries').html(response);
         $('#tableassets').DataTable({
           // "bSort": false
           dom: 'Bfrtip',
           buttons: [
             'pageLength', 'excelHtml5', 'pdfHtml5', 'csvHtml5'
           ]
          });



      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()






 function listallrcvdassets(store_id){


    var call_fn = 'listallrcvdassetsphp';
   


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&store_id=' + store_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listassetentries').html(response);
        var table =  $('#tableassets').DataTable({
          // "bSort": false
          dom: 'Bfrtip',
         buttons: [
           'pageLength', 'excelHtml5', 'pdfHtml5', 'csvHtml5'
         ]
          });



      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()







 function recceivedAsset(editid){


    var call_fn = 'recceivedAssetphp';
    var store_id  = sessionStorage.getItem('user_store');
    var created_by  = sessionStorage.getItem('user_id');

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&editid=' + editid+'&created_by=' + created_by+'&store_id=' + store_id+'&call_fn=' + call_fn,
        success: function(response){



      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()




function selectToolTicketNo(){

  var call_fn ='selectToolTicketNophp';


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


}  // checkcurrpasswd(userpassword)






    function enternewtools (){



  var assetticket = $.trim($("#tools_ticketno").val());
  var assetclass = $.trim($("#tools_class").val());
  var assetname = $.trim($("#tools_name").val());
  var assetdescrip = $.trim($("#tools_descrip").val());
  var assetmodelno = $.trim($("#tools_modelno").val());
  var assetserialno  = $.trim($("#tools_serialno").val());
  var assetlabelno = $.trim($("#tools_labelno").val());
  var assetstatus = $.trim($("#tools_status").val());
  var assetorg = sessionStorage.getItem('user_company');
  var assetstore = sessionStorage.getItem('user_store');
  var assetcreatedby = sessionStorage.getItem('user_id');

  var call_fn = 'enternewtoolsphp';





 if (assetname == '') {

  $("#warningmsg").text('Fields with * must be filled.');
  document.getElementById("warningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&assetticket=' + assetticket+ '&assetclass=' + assetclass+ '&assetname=' + assetname+
        '&assetdescrip=' + assetdescrip+ '&assetmodelno=' + assetmodelno
        + '&assetserialno=' + assetserialno+ '&assetlabelno=' + assetlabelno+  '&assetstatus=' + assetstatus+
         '&assetorg=' + assetorg+ '&assetstore=' + assetstore+ '&assetcreatedby=' + assetcreatedby+ '&call_fn=' + call_fn,
        success: function(response){


    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Tool entered successfully');
      document.getElementById("successmsg").style.display = "block";
      document.getElementById("warningmsg").style.display = "none";
      document.getElementById("tools_ticketno").value = selectToolTicketNo();
      resetnewtool ();
      location.reload();
      //  emplistalljobs();


    } else {


     $("#warningmsg").text('Tool entry failed');
     document.getElementById("warningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation





function resetnewtool (){

 document.getElementById("tools_class").value = '';
  document.getElementById("tools_name").value = '';
  document.getElementById("tools_descrip").value = '';
  document.getElementById("tools_modelno").value = '';
  document.getElementById("tools_serialno").value = '';
  document.getElementById("tools_labelno").value = '';

 }




 function listalltoolentries(company_id,store_id){


    var call_fn = 'listalltoolentriesphp';
  

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&store_id=' + store_id+'&company_id=' + company_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listassetentries').html(response);
         $('#tableassets').DataTable({
           // "bSort": false
           dom: 'Bfrtip',
           buttons: [
             'pageLength','excelHtml5', 'pdfHtml5', 'csvHtml5'
           ]
          });



      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()




 function checkoutTool(editid){


    var call_fn = 'checkoutToolphp';
    var created_by = sessionStorage.getItem('user_id');
    var dispatcherid = sessionStorage.getItem('dispatcher_id');


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&editid=' + editid+'&created_by=' + created_by+'&dispatcherid=' + dispatcherid+'&call_fn=' + call_fn,
        success: function(response){


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()




 function checkInTool(editid){


    var call_fn = 'checkInToolphp';
    var created_by  = sessionStorage.getItem('dispatcher_id');

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&editid=' + editid+'&created_by=' + created_by+'&call_fn=' + call_fn,
        success: function(response){


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()





function selectUtilTicketNo(){

  var call_fn ='selectUtilTicketNophp';


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


}  // checkcurrpasswd(userpassword)






    function enternewutils (){



  var assetticket = $.trim($("#tools_ticketno").val());
  var assetclass = $.trim($("#tools_class").val());
  var assetname = $.trim($("#tools_name").val());
  var assetdescrip = $.trim($("#tools_descrip").val());
  var assetmodelno = $.trim($("#tools_modelno").val());
  var assetserialno  = $.trim($("#tools_serialno").val());
  var assetlabelno = $.trim($("#tools_labelno").val());
  var assetstatus = $.trim($("#tools_status").val());
  var assetorg = sessionStorage.getItem('user_company');
  var assetstore = sessionStorage.getItem('user_store');
  var assetcreatedby = sessionStorage.getItem('user_id');

  var call_fn = 'enternewutilsphp';





 if (assetname == '') {

  $("#warningmsg").text('Fields with * must be filled.');
  document.getElementById("warningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&assetticket=' + assetticket+ '&assetclass=' + assetclass+ '&assetname=' + assetname+
        '&assetdescrip=' + assetdescrip+ '&assetmodelno=' + assetmodelno
        + '&assetserialno=' + assetserialno+ '&assetlabelno=' + assetlabelno+  '&assetstatus=' + assetstatus+
         '&assetorg=' + assetorg+ '&assetstore=' + assetstore+ '&assetcreatedby=' + assetcreatedby+ '&call_fn=' + call_fn,
        success: function(response){


    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Tool entered successfully');
      document.getElementById("successmsg").style.display = "block";
      document.getElementById("warningmsg").style.display = "none";
      document.getElementById("tools_ticketno").value = selectToolTicketNo();
      resetnewtool ();
      location.reload();
      //  emplistalljobs();


    } else {


     $("#warningmsg").text('Tool entry failed');
     document.getElementById("warningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation







 function listallutilentries(company_id,store_id){


    var call_fn = 'listallutilentriesphp';


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&store_id=' + store_id+'&company_id=' + company_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listassetentries').html(response);
         $('#tableassets').DataTable({
           // "bSort": false
           dom: 'Bfrtip',
           buttons: [
             'pageLength','excelHtml5', 'pdfHtml5', 'csvHtml5'
           ]
          });



      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()






 function checkoutUtil(editid){


    var call_fn = 'checkoutUtilphp';
    var created_by = '1';
    var dispatcherid = sessionStorage.getItem('dispatcher_id');


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&editid=' + editid+'&created_by=' + created_by+'&dispatcherid=' + dispatcherid+'&call_fn=' + call_fn,
        success: function(response){


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()




 function checkInUtil(editid){


    var call_fn = 'checkInUtilphp';
    var created_by = '1';

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&editid=' + editid+'&created_by=' + created_by+'&call_fn=' + call_fn,
        success: function(response){


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()






function selectUserID(){

  var call_fn ='selectUserIDphp';


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


}  // checkcurrpasswd(userpassword)








    function enternewusers (){



  var user_name = $.trim($("#user_name").val());
  var user_firstname = $.trim($("#user_firstname").val());
  var user_lastname = $.trim($("#user_lastname").val());
  var user_organisation = $.trim($("#user_organisation").val());
  var user_store = $.trim($("#user_store").val());
  var user_email  = $.trim($("#user_email").val());
  var user_phone = $.trim($("#user_phone").val());
  var user_level = $.trim($("#user_level").val());
  var user_passwd = $.trim($("#user_passwd").val());



  var call_fn = 'enternewusersphp';





 if (user_firstname == '' || user_lastname == '' || user_organisation == '' 
 || user_store == 'default' || user_password == '' || user_level == '' ) {


  $("#warningmsg").text('Fields with * must be filled.');
  document.getElementById("warningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&user_name=' + user_name+ '&user_firstname=' + user_firstname+ 
        '&user_lastname=' + user_lastname+'&user_organisation=' + user_organisation+ 
        '&user_store=' + user_store+ '&user_email=' + user_email+ '&user_phone=' + user_phone+  
        '&user_password=' + user_password+'&user_level=' + user_level+ '&user_passwd=' + user_passwd+
         '&call_fn=' + call_fn,
        success: function(response){


   
    if (response.indexOf('exists') !== -1) { 


      $("#warningmsg").text('This user already exists.');
      document.getElementById("warningmsg").style.display = "block";

      
    }
    else if (response.indexOf('success') !== -1) {


      $("#successmsg").text('User entered successfully');
      document.getElementById("successmsg").style.display = "block";
      document.getElementById("warningmsg").style.display = "none";
      document.getElementById("user_name").value = selectUserID();
      resetnewUser ();
      location.reload();
      //  emplistalljobs();


    } else {

     
     $("#warningmsg").text('User entry failed');
     document.getElementById("warningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation




function resetnewUser (){

 document.getElementById("user_firstname").value = '';
  document.getElementById("user_lastname").value = '';
  document.getElementById("user_email").value = '';
  document.getElementById("user_phone").value = '';
  document.getElementById("user_passwd").value = '12345';

 }






 function listallusers(company_id,store_id){


    var call_fn = 'listallusersphp';
   


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&store_id=' + store_id+'&company_id=' + company_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listassetentries').html(response);
         $('#tableassets').DataTable({
           // "bSort": false
           dom: 'Bfrtip',
          buttons: [
            'pageLength', 'excelHtml5', 'pdfHtml5', 'csvHtml5'
          ]
          });



      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()







    function updatenewtools (){


  var assetid = sessionStorage.getItem('asset_id');
  var assetticket = $.trim($("#edittools_ticketno").val());
  var assetclass = $.trim($("#edittools_class").val());

  var assetname = $.trim($("#edittools_name").val());
  var assetdescrip = $.trim($("#edittools_descrip").val());
  var assetmodelno = $.trim($("#edittools_modelno").val());

  var assetserialno  = $.trim($("#edittools_serialno").val());
  var assetlabelno = $.trim($("#edittools_labelno").val());
  var assetstatus = $.trim($("#edittools_status").val());
  var assetorg  = sessionStorage.getItem('user_company');
  var assetstore  = sessionStorage.getItem('user_store');
  var assetcreatedby  = sessionStorage.getItem('user_id');

  var call_fn = 'updatenewtoolsphp';





 if (assetname == '') {

  $("#editwarningmsg").text('Fields with * must be filled.');
  document.getElementById("editwarningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&assetid=' + assetid+ '&assetclass=' + assetclass+ '&assetname=' + assetname+
        '&assetdescrip=' + assetdescrip+ '&assetmodelno=' + assetmodelno
        + '&assetserialno=' + assetserialno+ '&assetlabelno=' + assetlabelno+  '&assetstatus=' + assetstatus+
         '&assetorg=' + assetorg+ '&assetstore=' + assetstore+ '&assetcreatedby=' + assetcreatedby+ '&call_fn=' + call_fn,
        success: function(response){



    if (response.indexOf('success') !== -1) {

      $("#editsuccessmsg").text('Tool updated successfully');
      document.getElementById("editsuccessmsg").style.display = "block";
      document.getElementById("editwarningmsg").style.display = "none";
      location.reload();
      //  emplistalljobs();


    } else {


     $("#editwarningmsg").text('Tool updating failed');
     document.getElementById("editwarningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation




function getEditTool(editid) {


  sessionStorage.setItem('asset_id', editid);



  var asset_ticketno = selectToolDetails ('tools_ticketno');
  var asset_class = selectToolDetails ('tools_class');
  var asset_name = selectToolDetails ('tools_name');
  var asset_descrip = selectToolDetails ('tools_descrip');
  var asset_modelno = selectToolDetails ('tools_modelno');
  var asset_serialno = selectToolDetails ('tools_serialno');
  var asset_labelno = selectToolDetails ('tools_labelno');
  var asset_status = selectToolDetails ('tools_status');



   document.getElementById("edittools_ticketno").value = asset_ticketno;
   document.getElementById("edittools_class").value = asset_class;
   document.getElementById("edittools_name").value = asset_name;
   document.getElementById("edittools_descrip").value = asset_descrip;
   document.getElementById("edittools_modelno").value = asset_modelno;
   document.getElementById("edittools_serialno").value = asset_serialno;
   document.getElementById("edittools_labelno").value = asset_labelno;


   listbox = document.getElementById("edittools_status");
   searchtext = $.trim(asset_status);

  for (var i = 0; i < listbox.options.length; ++i) {

  if (listbox.options[i].text == searchtext) listbox.options[i].selected = true ;

  }




}




// company details
function selectToolDetails (selectcol){

  var call_fn ='selectToolDetailsphp';
  var asset_id = sessionStorage.getItem('asset_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details






function getViewRcvAsset(editid) {



  sessionStorage.setItem('asset_id', editid);

  var asset_ticketno = selectRcvDetails ('sentitems_ticketno');
  var asset_class = selectRcvDetails ('sentitems_class');
  var asset_name = selectRcvDetails ('sentitems_name');
  var asset_descrip = selectRcvDetails ('sentitems_descrip');
  var asset_modelno = selectRcvDetails ('sentitems_modelno');
  var asset_serialno = selectRcvDetails ('sentitems_serialno');
  var asset_labelno = selectRcvDetails ('sentitems_labelno');
  var asset_status = selectRcvDetails ('sentitems_status');



   document.getElementById("edit_ticketno").value = asset_ticketno;
   document.getElementById("edit_name").value = asset_name;
   document.getElementById("edit_descrip").value = asset_descrip;
   document.getElementById("edit_modelno").value = asset_modelno;

   document.getElementById("edit_serialno").value = asset_serialno;
   document.getElementById("edit_labelno").value = asset_labelno;

  document.getElementById("edit_class").value = asset_class;
  document.getElementById("edit_status").value = asset_status;






}



// company details
function selectRcvDetails (selectcol){

  var call_fn ='selectRcvDetailsphp';
  var asset_id = sessionStorage.getItem('asset_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details






function getEditUtil(editid) {


  sessionStorage.setItem('asset_id', editid);



  var asset_ticketno = selectUtilDetails ('util_ticketno');
  var asset_class = selectUtilDetails ('util_class');
  var asset_name = selectUtilDetails ('util_name');
  var asset_descrip = selectUtilDetails ('util_description');
  var asset_modelno = selectUtilDetails ('util_modelno');
  var asset_serialno = selectUtilDetails ('util_serialno');
  var asset_labelno = selectUtilDetails ('util_labelno');
  var asset_status = selectUtilDetails ('util_status');



   document.getElementById("edittools_ticketno").value = asset_ticketno;
   document.getElementById("edittools_class").value = asset_class;
   document.getElementById("edittools_name").value = asset_name;
   document.getElementById("edittools_descrip").value = asset_descrip;
   document.getElementById("edittools_modelno").value = asset_modelno;
   document.getElementById("edittools_serialno").value = asset_serialno;
   document.getElementById("edittools_labelno").value = asset_labelno;


   listbox = document.getElementById("edittools_status");
   searchtext = $.trim(asset_status);

  for (var i = 0; i < listbox.options.length; ++i) {

  if (listbox.options[i].text == searchtext) listbox.options[i].selected = true ;

  }




}




// company details
function selectUtilDetails (selectcol){

  var call_fn ='selectUtilDetailsphp';
  var asset_id = sessionStorage.getItem('asset_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details






    function updatenewutils (){


  var assetid = sessionStorage.getItem('asset_id');
  var assetticket = $.trim($("#edittools_ticketno").val());
  var assetclass = $.trim($("#edittools_class").val());

  var assetname = $.trim($("#edittools_name").val());
  var assetdescrip = $.trim($("#edittools_descrip").val());
  var assetmodelno = $.trim($("#edittools_modelno").val());

  var assetserialno  = $.trim($("#edittools_serialno").val());
  var assetlabelno = $.trim($("#edittools_labelno").val());
  var assetstatus = $.trim($("#edittools_status").val());
  var assetorg = sessionStorage.getItem('user_company');
  var assetstore = sessionStorage.getItem('user_store');
  var assetcreatedby = sessionStorage.getItem('user_id');

  var call_fn = 'updatenewutilsphp';





 if (assetname == '') {

  $("#editwarningmsg").text('Fields with * must be filled.');
  document.getElementById("editwarningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&assetid=' + assetid+ '&assetclass=' + assetclass+ '&assetname=' + assetname+
        '&assetdescrip=' + assetdescrip+ '&assetmodelno=' + assetmodelno
        + '&assetserialno=' + assetserialno+ '&assetlabelno=' + assetlabelno+  '&assetstatus=' + assetstatus+
         '&assetorg=' + assetorg+ '&assetstore=' + assetstore+ '&assetcreatedby=' + assetcreatedby+ '&call_fn=' + call_fn,
        success: function(response){



    if (response.indexOf('success') !== -1) {

      $("#editsuccessmsg").text('Tool updated successfully');
      document.getElementById("editsuccessmsg").style.display = "block";
      document.getElementById("editwarningmsg").style.display = "none";
      location.reload();
      //  emplistalljobs();


    } else {


     $("#editwarningmsg").text('Tool updating failed');
     document.getElementById("editwarningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation





function getEditUser(editid) {


  sessionStorage.setItem('asset_id', editid);


  var user_code = selectUserDetails ('user_code');
  var user_firstname = selectUserDetails ('user_firstname');
  var user_lastname = selectUserDetails ('user_lastname');
  var user_organisation = selectUserDetails ('user_organisation');
  var user_store = selectUserDetails ('user_store');
  var user_email = selectUserDetails ('user_email');
  var user_phone = selectUserDetails ('user_phone');
  var edituser_level = selectUserDetails ('user_level');




   document.getElementById("edituser_name").value = user_code;
   document.getElementById("edituser_firstname").value = user_firstname;
   document.getElementById("edituser_lastname").value = user_lastname;
   document.getElementById("edituser_phone").value = user_phone;
   document.getElementById("edituser_email").value = user_email;



  var listbox = document.getElementById("edituser_organisation");
  var searchtext = $.trim(user_level);

  
  for (var i = 0; i < listbox.options.length; ++i) {

  if (listbox.options[i].text == searchtext) listbox.options[i].selected = true ;

  }


  var listbox = document.getElementById("edituser_store");
  var searchtext = $.trim(user_store);


  for (var i = 0; i < listbox.options.length; ++i) {

  if (listbox.options[i].value == searchtext) listbox.options[i].selected = true ;

  }


  var listbox = document.getElementById("edituser_level");
  var searchtext = $.trim(edituser_level);

// alert(searchtext);
  for (var i = 0; i < listbox.options.length; ++i) {

  if (listbox.options[i].value== searchtext) listbox.options[i].selected = true ;

  }



}




// company details
function selectUserDetails (selectcol){

  var call_fn ='selectUserDetailsphp';
  var asset_id = sessionStorage.getItem('asset_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details




function selectUserNames(){

  var call_fn ='selectUserNamesphp';
  var asset_id = sessionStorage.getItem('asset_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details







    function editnewusers (){



  var asset_id = sessionStorage.getItem('asset_id');
  var edituser_firstname = $.trim($("#edituser_firstname").val());
  var edituser_lastname = $.trim($("#edituser_lastname").val());
  var edituser_organisation = $.trim($("#edituser_organisation").val());
  var edituser_store = $.trim($("#edituser_store").val());
  var edituser_email  = $.trim($("#edituser_email").val());
  var edituser_phone = $.trim($("#edituser_phone").val());
  var edituser_level = $.trim($("#edituser_level").val());
// alert(edituser_level);
  var call_fn = 'editnewusersphp';





  if (user_firstname == '' || user_lastname == '' || user_organisation == '' 
 || user_store == 'default' || user_password == '' || user_level == '' ) {

  $("#editwarningmsg").text('Fields with * must be filled.');
  document.getElementById("editwarningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&asset_id=' + asset_id+ '&edituser_firstname=' + edituser_firstname+ 
        '&edituser_lastname=' + edituser_lastname+
        '&edituser_organisation=' + edituser_organisation+ '&edituser_store=' + edituser_store+ 
        '&edituser_email=' + edituser_email+ '&edituser_phone=' + edituser_phone+  
        '&edituser_level=' + edituser_level+ '&call_fn=' + call_fn,
        success: function(response){
// alert(response);

    if (response.indexOf('success') !== -1) {


      $("#editsuccessmsg").text('User edited successfully');
      document.getElementById("editsuccessmsg").style.display = "block";
      document.getElementById("editwarningmsg").style.display = "none";
      location.reload();
      //  emplistalljobs();


    } else {


     $("#editwarningmsg").text('User edit failed');
     document.getElementById("editwarningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation


   function resetsuserPassword (){



  var asset_id = sessionStorage.getItem('asset_id');
  var call_fn = 'resetsuserPasswordphp';



         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
        success: function(response){



      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}






function counterTicket(htmlcounter,count) {

 var $ticket_counter = $(htmlcounter);


var ticket_max = count;
var current = 0;

var updatelength = function() {

   current +=3;
   $ticket_counter.html(current);
   updateTick();

};


var updateTick = function() {

   if (current < ticket_max) {

      requestAnimationFrame(updatelength);

   } else {

      $ticket_counter.html(ticket_max);

   }

};


updatelength();

}







  function countTicket(){

  var call_fn ='countTicketphp';
  var store_id ='1';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&store_id=' + store_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details




function countAsset(){

  var call_fn ='countAssetphp';
  var store_id ='1';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&store_id=' + store_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details






function countSolution(){

  var call_fn ='countSolutionphp';
  var store_id ='1';


  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&store_id=' + store_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company





function countUsers(){

  var call_fn ='countUsersphp';
  var store_id ='1';


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


} // company details




function countReqs(){

  var call_fn ='countReqsphp';
  var store_id ='1';


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


} // company details




function listdashboardinc(){


    var call_fn = 'listdashboardincphp';
    var company_id = '1';

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&company_id=' + company_id+'&call_fn=' + call_fn,
        success: function(response){

         $('#listincidences').html(response);


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()




function listdashboardassets(){


    var call_fn = 'listdashboardassetsphp';
    var company_id = '1';

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&company_id=' + company_id+'&call_fn=' + call_fn,
        success: function(response){

         $('#listassets').html(response);


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()



function listdashboardsolution(){


    var call_fn = 'listdashboardsolutionphp';
    var company_id = '1';

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&company_id=' + company_id+'&call_fn=' + call_fn,
        success: function(response){

         $('#listsolution').html(response);


      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()



function listdashboardusers(){


    var call_fn = 'listdashboardusersphp';
    var store_id = '1';

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&store_id=' + store_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listassetentries').html(response);

      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()





  function fillnewsolClass (){


        var call_fn ='fillnewsolClassphp';

        $.ajax({

          url : phpfilename,
          type: "POST",
          data: '&call_fn=' + call_fn,
        success: function(data){

          // alert(data);

         $('#new_divclassname').html(data);


         }

});




  }   // empsignuponevalidation





    function addnewSolution (){



  var solutionclass = $.trim($("#solution_class").val());
  var solutionitemname = $.trim($("#solution_itemname").val());
  var solutiontitle = $.trim($("#solution_title").val());
  var solutiondetails = CKEDITOR.instances.editor1.getData();
      solutiondetails = escape(solutiondetails);
  var call_fn = 'addnewSolutionphp';



 if (solutionclass == ''|| solutionitemname == ''|| solutiontitle == ''||
  solutiondetails == '') {

    $("#warningmsg").text('Fields with * must be filled.');
    document.getElementById("warningmsg").style.display = "block";


} else {


// alert(solutiondetails);
         $.ajax({
        url : phpfilename,
        type: "POST",
        data: '&solutionclass=' + solutionclass+ '&solutionitemname=' + solutionitemname+ '&solutiontitle=' + solutiontitle+
        '&solutiondetails=' + solutiondetails+ '&call_fn=' + call_fn,
        success: function(response){

    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Solution entered successfully');
      document.getElementById("successmsg").style.display = "block";
       document.getElementById("warningmsg").style.display = "none";
      resetNewSolution ();
      location.reload();


    } else {

// alert(response);
      $("#warningmsg").text('Solution posting failed');
      document.getElementById("warningmsg").style.display = "block";


    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}


}   // empsignuponevalidation






function resetNewSolution(){

for (instance in CKEDITOR.instances){
CKEDITOR.instances['editor1'].setData(" ");
}

document.getElementById('solution_class').value = '';
document.getElementById('solution_itemname').value = '';
document.getElementById('solution_title').value = '';

}




 function listallsolutionssentries(){


    var call_fn = 'listallsolutionssentriesphp';
    var store_id = '1';

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&store_id=' + store_id+'&call_fn=' + call_fn,
        success: function(response){


         $('#listassetentries').html(response);
         $('#tableassets').DataTable({
           // "bSort": false
           dom: 'Bfrtip',
           buttons: [
             'pageLength','excelHtml5', 'pdfHtml5', 'csvHtml5'
           ]
          });



      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}// selectcompanyName ()






function hidesolution(rowid,status){


 
  var call_fn ='hidesolutionphp';


  
  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&rowid=' + rowid+'&status=' + status+'&call_fn=' + call_fn,
  success: function(data){

    // alert(data);




   }

});




}   // empsignuponevalidation




function getEditSolution(editid) {


  sessionStorage.setItem('request_id', editid);

  var editsol_topic = selectSolutiontDetails ('solution_topic');
  var editsol_subtopic = selectSolutiontDetails ('solution_subtopic');
  var editsol_title = selectSolutiontDetails('solution_title');
  var editsol_content = selectSolutiontDetails ('solution_content');


   document.getElementById("editsolution_itemclass").value = editsol_topic;
   document.getElementById("editsolution_itemname").value = editsol_subtopic;
   document.getElementById("editsolution_title").value = editsol_title;


   for (instance in CKEDITOR.instances){
    CKEDITOR.instances['edit_editor1'].setData(editsol_content);
 }


}




// company details
function selectSolutiontDetails (selectcol){

  var call_fn ='selectSolutiontDetailsphp';
  var request_id = sessionStorage.getItem('request_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&request_id=' + request_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details





// company details
function selectSolutiontContent (selectcol){

  var call_fn ='selectSolutiontContentphp';
  var request_id = sessionStorage.getItem('request_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&request_id=' + request_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details





function editnewSolution (){



  var solutionclass = $.trim($("#editsolution_itemclass").val());
  var solutionitemname = $.trim($("#editsolution_itemname").val());
  var solutiontitle = $.trim($("#editsolution_title").val());
  var solutiondetails = CKEDITOR.instances.edit_editor1.getData();
      solutiondetails = escape(solutiondetails);
  var request_id = sessionStorage.getItem('request_id');
  var call_fn = 'editnewSolutionphp';



 if (solutionclass == ''|| solutionitemname == ''|| solutiontitle == ''||
  solutiondetails == '') {

    $("#editwarningmsg").text('Fields with * must be filled.');
    document.getElementById("editwarningmsg").style.display = "block";


} else {


// alert(solutiondetails);
         $.ajax({
        url : phpfilename,
        type: "POST",
        data: '&solutionclass=' + solutionclass+ '&solutionitemname=' + solutionitemname+ '&solutiontitle=' + solutiontitle+
        '&solutiondetails=' + solutiondetails+ '&request_id=' + request_id+ '&call_fn=' + call_fn,
        success: function(response){

    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Solution edited successfully');
      document.getElementById("editsuccessmsg").style.display = "block";
      document.getElementById("editwarningmsg").style.display = "none";
       resetEditSolution ();
      location.reload();


    } else {

alert(response);
      $("#editwarningmsg").text('Solution edited failed');
      document.getElementById("editwarningmsg").style.display = "block";


    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}


}   // empsignuponevalidation



function resetEditSolution(){

  for (instance in CKEDITOR.instances){
  CKEDITOR.instances['edit_editor1'].setData(" ");
  }
  
  document.getElementById('solution_class').value = '';
  document.getElementById('solution_itemname').value = '';
  document.getElementById('solution_title').value = '';
  
  }



  
function editnewSolution (){



  var solutionclass = $.trim($("#editsolution_itemclass").val());
  var solutionitemname = $.trim($("#editsolution_itemname").val());
  var solutiontitle = $.trim($("#editsolution_title").val());
  var solutiondetails = CKEDITOR.instances.edit_editor1.getData();
      solutiondetails = escape(solutiondetails);
  var request_id = sessionStorage.getItem('request_id');
  var call_fn = 'editnewSolutionphp';



 if (solutionclass == ''|| solutionitemname == ''|| solutiontitle == ''||
  solutiondetails == '') {

    $("#editwarningmsg").text('Fields with * must be filled.');
    document.getElementById("editwarningmsg").style.display = "block";


} else {


// alert(solutiondetails);
         $.ajax({
        url : phpfilename,
        type: "POST",
        data: '&solutionclass=' + solutionclass+ '&solutionitemname=' + solutionitemname+ '&solutiontitle=' + solutiontitle+
        '&solutiondetails=' + solutiondetails+ '&request_id=' + request_id+ '&call_fn=' + call_fn,
        success: function(response){

    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Solution edited successfully');
      document.getElementById("editsuccessmsg").style.display = "block";
      document.getElementById("editwarningmsg").style.display = "none";
       resetEditSolution ();
      location.reload();


    } else {

      // alert(response);
      $("#editwarningmsg").text('Solution edited failed');
      document.getElementById("editwarningmsg").style.display = "block";


    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}


}   // empsignuponevalidation



  
function delSolution (){



  var request_id = sessionStorage.getItem('request_id');
  var call_fn = 'delSolutionphp';


         $.ajax({
        url : phpfilename,
        type: "POST",
        data: '&request_id=' + request_id+ '&call_fn=' + call_fn,
        success: function(response){

    if (response.indexOf('success') !== -1) {


      location.reload();


    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}   // empsignuponevalidation




function getViewSolution(editid) {



  sessionStorage.setItem('request_id', editid);

  var editsol_topic = selectSolutiontDetails ('solution_topic');
  var editsol_subtopic = selectSolutiontDetails ('solution_subtopic');
  var editsol_title = selectSolutiontDetails('solution_title');
  var editsol_content = selectSolutiontContent ('solution_content');
  


  document.getElementById("view_itemclass").value = '';
   document.getElementById("view_itemname").value = '';
   document.getElementById("view_title").value = '';
   document.getElementById("view_editor").value = '';



   document.getElementById("view_itemclass").value = editsol_topic;
   document.getElementById("view_itemname").value = editsol_subtopic;
   document.getElementById("view_title").value = editsol_title;
   document.getElementById("view_editor").value = editsol_content;


  


}



function selectCountryId(){

  var call_fn ='selectCountryIdphp';


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


}  // checkcurrpasswd(userpassword)






function enternewcountry (){



  var country_id = $.trim($("#country_id").val());
  var country_name = $.trim($("#country_name").val());
  var country_code = $.trim($("#country_code").val());



  var call_fn = 'enternewcountryphp';





 if (country_name == '' || country_code == '' ) {

  $("#warningmsg").text('Fields with * must be filled.');
  document.getElementById("warningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&country_id=' + country_id+ '&country_name=' + country_name+ '&country_code=' + country_code+
         '&call_fn=' + call_fn,
        success: function(response){


    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Country added successfully');
      document.getElementById("successmsg").style.display = "block";
      document.getElementById("warningmsg").style.display = "none";
      document.getElementById("country_id").value = selectCountryId();
      resetCountry ();
      location.reload();
      //  emplistalljobs();


    } else if (response.indexOf('exists') !== -1) {


     $("#warningmsg").text('Country exists');
     document.getElementById("warningmsg").style.display = "block";

    } else {


      $("#warningmsg").text('Country entry failed');
      document.getElementById("warningmsg").style.display = "block";

 
     }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation




  
 function listallcountries(){


  var call_fn = 'listallcountriesphp';
  var store_id = '1';

       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&store_id=' + store_id+'&call_fn=' + call_fn,
      success: function(response){


       $('#listassetentries').html(response);
       $('#tableassets').DataTable({
         // "bSort": false
         dom: 'Bfrtip',
        buttons: [
          'pageLength', 'excelHtml5', 'pdfHtml5', 'csvHtml5'
        ]
        });



    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()

 



function getEditCountry(editid) {



  sessionStorage.setItem('asset_id', editid);



  var country_no = selectCountryDetails ('country_no');
  var country_name = selectCountryDetails ('country_name');
  var country_code = selectCountryDetails ('country_code');


   document.getElementById("editcountry_id").value = country_no;
   document.getElementById("editcountry_name").value = country_name;
   document.getElementById("editcountry_code").value = country_code;


  // var listbox = document.getElementById("edituser_level");
  // var searchtext = $.trim(user_level);

  // for (var i = 0; i < listbox.options.length; ++i) {

  // if (listbox.options[i].text == searchtext) listbox.options[i].selected = true ;

  // }


}




// company details
function selectCountryDetails (selectcol){

  var call_fn ='selectCountryDetailsphp';
  var asset_id = sessionStorage.getItem('asset_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details






function editcountries (){



  var asset_id = sessionStorage.getItem('asset_id');
  var editcountry_name = $.trim($("#editcountry_name").val());
  var editcountry_code = $.trim($("#editcountry_code").val());

  var call_fn = 'editcountriesphp';





 if (editcountry_name == '' || editcountry_code == '') {

  $("#editwarningmsg").text('Fields with * must be filled.');
  document.getElementById("editwarningmsg").style.display = "block";


} else {
  

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&asset_id=' + asset_id+ '&editcountry_name=' + editcountry_name+ '&editcountry_code=' + editcountry_code+
        '&call_fn=' + call_fn,
        success: function(response){


    if (response.indexOf('success') !== -1) {

      
      $("#editsuccessmsg").text('Country edited successfully');
      document.getElementById("editsuccessmsg").style.display = "block";
      document.getElementById("editwarningmsg").style.display = "none";
      resetCountry ();
      location.reload();
      //  emplistalljobs();


    } else {


     $("#editwarningmsg").text('Country edit failed');
     document.getElementById("editwarningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation

function resetCountry (){

  document.getElementById("country_name").value = '';
   document.getElementById("country_code").value = '';
   document.getElementById("editcountry_name").value = '';
   document.getElementById("editcountry_code").value = '';
 
  }



  

function selectCompanyID(){

  var call_fn ='selectCompanyIDphp';


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


}  // checkcurrpasswd(userpassword)


 

function enternewcompany (){



  var company_id= $.trim($("#company_id").val());
  var company_name = $.trim($("#company_name").val());
  var company_country = $.trim($("#company_country").val());
  var company_phone = $.trim($("#company_phone").val());
  var company_email = $.trim($("#company_email").val());
  var company_website = $.trim($("#company_website").val());
  var company_address= $.trim($("#company_address").val());
  var company_city = $.trim($("#company_city").val());



 


  var call_fn = 'enternewcompanyphp';





 if (company_name == '' || company_country == '' ) {

  $("#warningmsg").text('Fields with * must be filled.');
  document.getElementById("warningmsg").style.display = "block";


} else {
  

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&company_id=' + company_id+ '&company_name=' + company_name+ '&company_country=' + company_country+
         '&company_phone=' + company_phone+ '&company_email=' + company_email+ '&company_website=' + company_website+ 
         '&company_address=' + company_address+ '&company_city=' + company_city+ '&call_fn=' + call_fn,
        success: function(response){

          // alert(response);

    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Company added successfully');
      document.getElementById("successmsg").style.display = "block";
      document.getElementById("warningmsg").style.display = "none";
      document.getElementById("company_id").value = selectCompanyID();
      resetCompany ();
      location.reload();
      //  emplistalljobs();


    } else if (response.indexOf('exists') !== -1) {


     $("#warningmsg").text('Company exists');
     document.getElementById("warningmsg").style.display = "block";

    } else {


      $("#warningmsg").text('Company entry failed');
      document.getElementById("warningmsg").style.display = "block";

 
     }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation


function resetCompany (){

  document.getElementById("company_name").value = '';
   document.getElementById("company_phone").value = '';
   document.getElementById("company_email").value = '';
   document.getElementById("company_website").value = '';
   document.getElementById("company_address").value = '';
   document.getElementById("company_city").value = '';

   document.getElementById("editcompany_name").value = '';
   document.getElementById("editcompany_phone").value = '';
   document.getElementById("editcompany_phone").value = '';
   document.getElementById("editcompany_email").value = '';
   document.getElementById("editcompany_website").value = '';
   document.getElementById("editcompany_address").value = '';
   document.getElementById("editcompany_city").value = '';

  }


  
  function fillcountrycompany (){


        var call_fn ='fillcountrycompanyphp';

        $.ajax({

          url : phpfilename,
          type: "POST",
          data: '&call_fn=' + call_fn,
        success: function(data){

          // alert(data);

        $('#divcompanycountry').html(data);


        }

    });

  }




  
  function listallcompanies(){


    var call_fn = 'listallcompaniesphp';
    var store_id = '1';
  
         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&call_fn=' + call_fn,
        success: function(response){
  
  
         $('#listassetentries').html(response);
         $('#tableassets').DataTable({
           // "bSort": false
           dom: 'Bfrtip',
          buttons: [
            'pageLength', 'excelHtml5', 'pdfHtml5', 'csvHtml5'
          ]
          });
  
  
  
      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);
  
  
      }
      });
  
  
  
  }// selectcompanyName ()




  

function getEditCompany(editid) {



  sessionStorage.setItem('asset_id', editid);



  var company_no= selectCompanyDetails ('company_no');
  var company_name = selectCompanyDetails ('company_name');
  var company_id = selectCompanyDetails ('company_country');
  var company_country = selectCountryDetailsID ('country_name',company_id);
  var company_phone = selectCompanyDetails ('company_phone');
  var company_email = selectCompanyDetails ('company_email');
  var company_website = selectCompanyDetails ('company_website');
  var company_address = selectCompanyDetails ('company_address');
  var company_town = selectCompanyDetails ('company_town');



   document.getElementById("editcompany_id").value = company_no;
   document.getElementById("editcompany_name").value = company_name;
   document.getElementById("editcompany_phone").value = company_phone;
   document.getElementById("editcompany_email").value = company_email;
   document.getElementById("editcompany_website").value = company_website;
   document.getElementById("editcompany_address").value = company_address;
   document.getElementById("editcompany_city").value = company_town;



  var listbox = document.getElementById("editcompany_country");
  var searchtext = $.trim(company_country);

  for (var i = 0; i < listbox.options.length; ++i) {

  if (listbox.options[i].text == searchtext) listbox.options[i].selected = true ;

  }


}



// company details
function selectCountryDetailsID (selectcol,asset_id){

  var call_fn ='selectCountryDetailsIDphp';



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details





// company details
function selectCompanyDetails (selectcol){

  var call_fn ='selectCompanyDetailsphp';
  var asset_id = sessionStorage.getItem('asset_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details



function filleditcountrycompany (){


  var call_fn ='filleditcountrycompanyphp';

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&call_fn=' + call_fn,
  success: function(data){

    // alert(data);

  $('#diveditcompanycountry').html(data);


  }

});

}






function editcompany (){




  var company_name = $.trim($("#editcompany_name").val());
  var company_country = $.trim($("#editcompany_country").val());
  var company_phone = $.trim($("#editcompany_phone").val());
  var company_email = $.trim($("#editcompany_email").val());
  var company_website = $.trim($("#editcompany_website").val());
  var company_address= $.trim($("#editcompany_address").val());
  var company_city = $.trim($("#editcompany_city").val());
  var asset_id = sessionStorage.getItem('asset_id');


 


  var call_fn = 'editcompanyphp';





 if (company_name == '' || company_country == '' ) {

  $("#editwarningmsg").text('Fields with * must be filled.');
  document.getElementById("editwarningmsg").style.display = "block";


} else {
  

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&company_name=' + company_name+ '&company_country=' + company_country+
         '&company_phone=' + company_phone+ '&company_email=' + company_email+ '&company_website=' + company_website+ 
         '&company_address=' + company_address+ '&company_city=' + company_city+
          '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
        success: function(response){

          // alert(response);

    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Company edited successfully');
      document.getElementById("editsuccessmsg").style.display = "block";
      document.getElementById("editwarningmsg").style.display = "none";
      resetCompany ();
      location.reload();
      //  emplistalljobs();


    } else if (response.indexOf('exists') !== -1) {


     $("#editwarningmsg").text('Company exists');
     document.getElementById("editwarningmsg").style.display = "block";

    } else {


      $("#editwarningmsg").text('Company edit failed');
      document.getElementById("editwarningmsg").style.display = "block";

 
     }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation




function selectStoreID(){

  var call_fn ='selectStoreIDphp';


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


}  // checkcurrpasswd(userpassword)



function fillstorecompany (){


  var call_fn ='fillstorecompanyphp';

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&call_fn=' + call_fn,
  success: function(data){

    // alert(data);

  $('#divstorecompany').html(data);


  }

});

}

  
function fillstorecountry (){


  var call_fn ='fillstorecountryphp';

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&call_fn=' + call_fn,
  success: function(data){

    // alert(data);

  $('#divstorecountry').html(data);


  }

});

}



 

function enternewstore (){



  var store_id= $.trim($("#store_id").val());
  var store_name = $.trim($("#store_name").val());
  var store_company = $.trim($("#store_company").val());
  var store_phone = $.trim($("#store_phone").val());
  var store_email = $.trim($("#store_email").val());
  var store_address = $.trim($("#store_address").val());
  var store_country= $.trim($("#store_country").val());
  var store_location = $.trim($("#store_location").val());


// alert('');
 


  var call_fn = 'enternewstorephp';





 if (store_name == '') {

  $("#warningmsg").text('Fields with * must be filled.');
  document.getElementById("warningmsg").style.display = "block";


} else {
  

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&store_id=' + store_id+ '&store_name=' + store_name+ '&store_company=' + store_company+
         '&store_phone=' + store_phone+ '&store_email=' + store_email+ '&store_address=' + store_address+ 
         '&store_country=' + store_country+ '&store_location=' + store_location+ '&call_fn=' + call_fn,
        success: function(response){

          // alert(response);

    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Store added successfully');
      document.getElementById("successmsg").style.display = "block";
      document.getElementById("warningmsg").style.display = "none";
      document.getElementById("store_id").value = selectStoreID();
      resetStore ();
      location.reload();
      //  emplistalljobs();


    } else if (response.indexOf('exists') !== -1) {


     $("#warningmsg").text('Store exists');
     document.getElementById("warningmsg").style.display = "block";

    } else {


      $("#warningmsg").text('Store entry failed');
      document.getElementById("warningmsg").style.display = "block";

 
     }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation


function resetStore (){

  document.getElementById("store_name").value = '';
   document.getElementById("store_phone").value = '';
   document.getElementById("store_email").value = '';
   document.getElementById("store_address").value = '';
   document.getElementById("store_location").value = '';

   document.getElementById("editstore_name").value = '';
   document.getElementById("editstore_phone").value = '';
   document.getElementById("editstore_email").value = '';
   document.getElementById("editstore_address").value = '';
   document.getElementById("editstore_location").value = '';

  }



  
// company details
function selectCountryDetailsName (selectcol){

  var call_fn ='selectCountryDetailsNamephp';
  var asset_id = sessionStorage.getItem('asset_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {

      
        return data;
    }

  }).responseText;


  return ticketid;


} // company details




  
function listallstores(){


  var call_fn = 'listallstoresphp';
  var store_id = '1';

       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&call_fn=' + call_fn,
      success: function(response){


       $('#listassetentries').html(response);
       $('#tableassets').DataTable({
         // "bSort": false
         dom: 'Bfrtip',
        buttons: [
          'pageLength', 'excelHtml5', 'pdfHtml5', 'csvHtml5'
        ]
        });



    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()



  

function getEditStore(editid) {



  sessionStorage.setItem('asset_id', editid);

 

  var store_no= selectStoreDetails ('store_no');
  var store_name = selectStoreDetails ('store_name');
  var store_companyid = selectStoreDetails ('store_company');
  var store_company = selectCompanyDetailsID ('country_name',store_companyid);
  var store_phone = selectStoreDetails ('store_phone');
  var store_email = selectStoreDetails ('store_email');
  var store_address = selectStoreDetails ('store_address');
  var store_location = selectStoreDetails('store_location');
  var store_countryid = selectStoreDetails ('store_country');
  var store_country = selectCountryDetailsID ('country_name',store_countryid);



   document.getElementById("editstore_id").value = store_no;
   document.getElementById("editstore_name").value = store_name;
   document.getElementById("editstore_phone").value = store_phone;
   document.getElementById("editstore_email").value = store_email;
   document.getElementById("editstore_address").value = store_address;
   document.getElementById("editstore_location").value = store_location;



  var listbox = document.getElementById("editstore_company");
  var searchtext = $.trim(store_companyid);

  for (var i = 0; i < listbox.options.length; ++i) {

  if (listbox.options[i].text == searchtext) listbox.options[i].selected = true ;

  }



  var listbox = document.getElementById("editstore_country");
  var searchtext = $.trim(store_country);

  for (var i = 0; i < listbox.options.length; ++i) {

  if (listbox.options[i].text == searchtext) listbox.options[i].selected = true ;

  }



}




// company details
function selectCompanyDetailsID (selectcol,asset_id){

  var call_fn ='selectCompanyDetailsIDphp';



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details



function filleditstorecompany (){


  var call_fn ='filleditstorecompanyphp';

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&call_fn=' + call_fn,
  success: function(data){

    // alert(data);

  $('#diveditstorecompany').html(data);


  }

});

}


  
function filleditstorecountry (){


  var call_fn ='filleditstorecountryphp';

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&call_fn=' + call_fn,
  success: function(data){

    // alert(data);

  $('#diveditstorecountry').html(data);


  }

});

}




 

function editnewstore (){


 
  var store_id = sessionStorage.getItem('asset_id');
  var store_name = $.trim($("#editstore_name").val());
  var store_company = $.trim($("#editstore_company").val());
  var store_phone = $.trim($("#editstore_phone").val());
  var store_email = $.trim($("#editstore_email").val());
  var store_address = $.trim($("#editstore_address").val());
  var store_country= $.trim($("#editstore_country").val());
  var store_location = $.trim($("#editstore_location").val());



  var call_fn = 'editnewstorephp';



 if (store_name == '') {

  $("#editwarningmsg").text('Fields with * must be filled.');
  document.getElementById("editwarningmsg").style.display = "block";


} else {
  

         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&store_id=' + store_id+ '&store_name=' + store_name+ '&store_company=' + store_company+
         '&store_phone=' + store_phone+ '&store_email=' + store_email+ '&store_address=' + store_address+ 
         '&store_country=' + store_country+ '&store_location=' + store_location+ '&call_fn=' + call_fn,
        success: function(response){

          // alert(response);

    if (response.indexOf('success') !== -1) {


      $("#editsuccessmsg").text('Store edit successfully');
      document.getElementById("editsuccessmsg").style.display = "block";
      document.getElementById("editwarningmsg").style.display = "none";
      document.getElementById("store_id").value = selectStoreID();
      resetStore ();
      location.reload();
      //  emplistalljobs();


    } else if (response.indexOf('exists') !== -1) {


     $("#editwarningmsg").text('Store exists');
     document.getElementById("editwarningmsg").style.display = "block";

    } else {


      $("#editwarningmsg").text('Store edit failed');
      document.getElementById("editwarningmsg").style.display = "block";

 
     }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation




function fillusercompany (){


  var call_fn ='fillusercompanyphp';

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&call_fn=' + call_fn,
  success: function(data){

    // alert(data);

  $('#divorgarnisation').html(data);
 

  }

});

}




function filluserstoresid (){


  var call_fn ='filluserstoresidphp';
  var asset_id = sessionStorage.getItem('asset_id');

 

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
  success: function(data){

    

  $('#divstore').html(data);


  }

});

}




function filleditusercompany (){


  var call_fn ='filleditusercompanyphp';

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&call_fn=' + call_fn,
  success: function(data){

    // alert(data);
  $('#diveditorgarnisation').html(data);
 

  }

});

}





function filledituserstores (){


  var call_fn ='filledituserstoresphp';
  var asset_id = sessionStorage.getItem('asset_id');

 

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
  success: function(data){
        

  $('#diveditstore').html(data);


  }

});

}




function enternewclass (){


  var asset_classname = $.trim($("#asset_classname").val());



  var call_fn = 'enternewclassphp';



 if (asset_classname == '') {


  $("#warningmsg").text('Fields with * must be filled.');
  document.getElementById("warningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&asset_classname=' + asset_classname+ '&call_fn=' + call_fn,
        success: function(response){
   
         
    if (response.indexOf('success') !== -1) {


      $("#successmsg").text('Class entered successfully');
      document.getElementById("successmsg").style.display = "block";
      document.getElementById("warningmsg").style.display = "none";
      resetnewClass ();
      // location.reload();
      //  emplistalljobs();


    } else {

     
     $("#warningmsg").text('Class entry failed');
     document.getElementById("warningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation




function resetnewClass (){

 document.getElementById("asset_classname").value = '';

 }




 function listallclass(){


  var call_fn = 'listallclassphp';
  var store_id = '1';

       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&call_fn=' + call_fn,
      success: function(response){


       $('#listassetentries').html(response);
       $('#tableassets').DataTable({
         // "bSort": false
         dom: 'Bfrtip',
        buttons: [
          'pageLength'
        ]
        });



    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()





function getEditClass(editid) {


  sessionStorage.setItem('asset_id', editid);
  var class_name = selectClassDetails ('class_name');


  document.getElementById("editasset_classname").value = class_name;


}



// company details
function selectClassDetails (selectcol){

  var call_fn ='selectClassDetailsphp';
  var asset_id = sessionStorage.getItem('asset_id');



  var ticketid = $.ajax({


    url : phpfilename,
    type: "POST",
    dataType: 'html',
    context: document.body,
    global: false,
    async:false,
    data: '&selectcol=' + selectcol+ '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
    success: function(data) {


        return data;
    }

  }).responseText;


  return ticketid;


} // company details






function editnewclass (){



  var asset_id = sessionStorage.getItem('asset_id');
  var editasset_classname = $.trim($("#editasset_classname").val());

  var call_fn = 'editnewclassphp';





  if (editasset_classname== '' ) {


  $("#editwarningmsg").text('Fields with * must be filled.');
  document.getElementById("editwarningmsg").style.display = "block";


} else {


         $.ajax({
        url: phpfilename,
        type: "POST",
        data: '&asset_id=' + asset_id+ '&editasset_classname=' + editasset_classname+ 
        '&call_fn=' + call_fn,
        success: function(response){
// alert(response);

    if (response.indexOf('success') !== -1) {


      $("#editsuccessmsg").text('Class edited successfully');
      document.getElementById("editsuccessmsg").style.display = "block";
      document.getElementById("editwarningmsg").style.display = "none";
      location.reload();
      //  emplistalljobs();


    } else {


     $("#editwarningmsg").text('Class edit failed');
     document.getElementById("editwarningmsg").style.display = "block";

    }


      },
      error: function(jqXHR, textStatus, errorThrown){

        // alert('');
        alert(jqXHR.status);
        alert(errorThrown);
        alert(textStatus);


      }
      });



}



}   // empsignuponevalidation





function getasset(){


  var call_fn = 'getassetphp';
  var store_id = '1';

       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&call_fn=' + call_fn,
      success: function(data){

        
        var your_data = JSON.parse(data);
       

      var classname = [];
			var classnumber = [];
     
     
      
      for (var i = 0; i < your_data.length; i++) {
        classname.push(your_data[i].class_name);
				classnumber.push(your_data[i].class_number);
    } 

      // console.log(your_data.length);

      var chartdata = {
				labels: classname,
				datasets : [
					{
						label: 'Asset Numbers',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba((200, 200, 200,  0.75)',
						hoverBackgroundColor: 'rgba((200, 200, 200,  1)',
						hoverBorderColor: 'rgba((200, 200, 200,  1)',
						data: classnumber
					}
				]
			};//chartdata

      var ctx = $('#mycanvas');
   

			var barGraph = new Chart(ctx, {
				type: 'horizontalBar',
				data: chartdata
			});

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()




function listallstoresassets(company_id){


  var call_fn = 'listallstoresassetsphp';
  

       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&call_fn=' + call_fn,
      success: function(response){

       $('#listassetentries').html(response);
     

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()



function getstoreassetgraph(company_id){


  var call_fn = 'getstoreassetgraphphp';


       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&call_fn=' + call_fn,
      success: function(data){

        // alert(data);
        var your_data = JSON.parse(data);
       

      var classname = [];
			var classnumber = [];
     
     
      
      for (var i = 0; i < your_data.length; i++) {
        classname.push(your_data[i].store_name);
				classnumber.push(your_data[i].trackass_count);
    } 

      // console.log(your_data.length);

      var chartdata = {
				labels: classname,
				datasets : [
					{
						label: 'Asset Numbers',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba((200, 200, 200,  0.75)',
						hoverBackgroundColor: 'rgba((200, 200, 200,  1)',
						hoverBorderColor: 'rgba((200, 200, 200,  1)',
						data: classnumber
					}
				]
			};//chartdata

      var ctx = $('#mycanvas');
   

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata
			});

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()




function listassetnameentries(company_id,store_id){

  
  var call_fn = 'listassetnameentriesphp';
 

       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&store_id=' + store_id+'&call_fn=' + call_fn,
      success: function(response){        
        // alert('response');
       $('#listassetnameentries').html(response);     

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()




function getstoreassetnamegraph(company_id,store_id){


  var call_fn = 'getstoreassetnamegraphphp';


       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&store_id=' + store_id+'&call_fn=' + call_fn,
      success: function(data){

        // alert(data);
        var your_data = JSON.parse(data);
       

      var classname = [];
			var classnumber = [];
     
     
      
      for (var i = 0; i < your_data.length; i++) {
        classname.push(your_data[i].trackass_class);
				classnumber.push(your_data[i].trackass_count);
    } 

      // console.log(your_data.length);

      var chartdata = {
				labels: classname,
				datasets : [
					{
						label: 'Asset Numbers',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba((200, 200, 200,  0.75)',
						hoverBackgroundColor: 'rgba((200, 200, 200,  1)',
						hoverBorderColor: 'rgba((200, 200, 200,  1)',
						data: classnumber
					}
				]
			};//chartdata

      var ctx = $('#mynamecanvas');
   

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata
			});

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()





function listallstoresincidences(company_id){


  var call_fn = 'listallstoresincidencesphp';



       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&call_fn=' + call_fn,
      success: function(response){

       $('#listassetentries').html(response);
     

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()





function getstoreincidentgraph(company_id){


  var call_fn = 'getstoreincidentgraphphp';

       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&call_fn=' + call_fn,
      success: function(data){

        // alert(data);
        var your_data = JSON.parse(data);
       

      var classname = [];
			var classnumber = [];
     
     
      
      for (var i = 0; i < your_data.length; i++) {
        classname.push(your_data[i].store_name);
				classnumber.push(your_data[i].incident_count);
    } 

      // console.log(your_data.length);

      var chartdata = {
				labels: classname,
				datasets : [
					{
						label: 'Incidences',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba((200, 200, 200,  0.75)',
						hoverBackgroundColor: 'rgba((200, 200, 200,  1)',
						hoverBorderColor: 'rgba((200, 200, 200,  1)',
						data: classnumber
					}
				]
			};//chartdata

      var ctx = $('#mycanvas');
   

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata
			});

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()




function listallnameincidences(company_id,store_id){


  var call_fn = 'listallnameincidencesphp';


       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&store_id=' + store_id+'&call_fn=' + call_fn,
      success: function(response){

       $('#listassetnameentries').html(response);
     

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()





function getnameincidentgraph(company_id,store_id){


  var call_fn = 'getnameincidentgraph';




       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&store_id=' + store_id+'&call_fn=' + call_fn,
      success: function(data){

        // alert(data);
        var your_data = JSON.parse(data);
       

      var classname = [];
			var classnumber = [];
     
     
      
      for (var i = 0; i < your_data.length; i++) {
        classname.push(your_data[i].incident_subcategory);
				classnumber.push(your_data[i].incident_count);
    } 

      // console.log(your_data.length);

      var chartdata = {
				labels: classname,
				datasets : [
					{
						label: 'Incidences',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba((200, 200, 200,  0.75)',
						hoverBackgroundColor: 'rgba((200, 200, 200,  1)',
						hoverBorderColor: 'rgba((200, 200, 200,  1)',
						data: classnumber
					}
				]
			};//chartdata

      var ctx = $('#mynamecanvas');
   

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata
			});

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()




function listallcountrystores(country_id){


  var call_fn = 'listallcountrystoresphp';
 

       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&country_id=' + country_id+'&call_fn=' + call_fn,
      success: function(response){

       $('#listassetentries').html(response);
     

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()






function getcountrystoresgraph(country_id){


  var call_fn = 'getcountrystoresgraphphp';


       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&country_id=' + country_id+'&call_fn=' + call_fn,
      success: function(data){

        // alert(data);
        var your_data = JSON.parse(data);
       

      var classname = [];
			var classnumber = [];     
     
      
      for (var i = 0; i < your_data.length; i++) {
        classname.push(your_data[i].country_name);
				classnumber.push(your_data[i].store_count);
    } 

      // console.log(your_data.length);

      var chartdata = {
				labels: classname,
				datasets : [
					{
						label: 'Stores',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba((200, 200, 200,  0.75)',
						hoverBackgroundColor: 'rgba((200, 200, 200,  1)',
						hoverBorderColor: 'rgba((200, 200, 200,  1)',
						data: classnumber
					}
				]
      };//chartdata
      

      var ctx = $('#mycanvas');
   

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata
			});

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()




function listallcompanyusers(){


  var call_fn = 'listallcompanyusersphp';
  var company_id = '';

       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&call_fn=' + call_fn,
      success: function(response){

       $('#listassetentries').html(response);
     

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()




function getcompanyusersgraph(company_id){


  var call_fn = 'getcompanyusersgraphphp';


       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&call_fn=' + call_fn,
      success: function(data){

        // alert(data);
        var your_data = JSON.parse(data);
       

      var classname = [];
			var classnumber = [];
     
     
      
      for (var i = 0; i < your_data.length; i++) {
        classname.push(your_data[i].company_name);
				classnumber.push(your_data[i].user_count);
    } 

      // console.log(your_data.length);

      var chartdata = {
				labels: classname,
				datasets : [
					{
						label: 'Users',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba((200, 200, 200,  0.75)',
						hoverBackgroundColor: 'rgba((200, 200, 200,  1)',
						hoverBorderColor: 'rgba((200, 200, 200,  1)',
						data: classnumber
					}
				]
			};//chartdata

      var ctx = $('#mycanvas');
   

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata
			});

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()




function listallstoreusers(company_id,store_id){


  var call_fn = 'listallstoreusersphp';


       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&store_id=' + store_id+'&call_fn=' + call_fn,
      success: function(response){

       $('#listassetnameentries').html(response);
     

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()



function getstoreusersgraph(company_id,store_id){


  var call_fn = 'getstoreusersgraphphp';


       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&store_id=' + store_id+'&call_fn=' + call_fn,
      success: function(data){

        // alert(data);
        var your_data = JSON.parse(data);
       

      var classname = [];
			var classnumber = [];
     
     
      
      for (var i = 0; i < your_data.length; i++) {
        classname.push(your_data[i].store_name);
				classnumber.push(your_data[i].user_count);
    } 

      // console.log(your_data.length);

      var chartdata = {
				labels: classname,
				datasets : [
					{
						label: 'Users',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba((200, 200, 200,  0.75)',
						hoverBackgroundColor: 'rgba((200, 200, 200,  1)',
						hoverBorderColor: 'rgba((200, 200, 200,  1)',
						data: classnumber
					}
				]
			};//chartdata

      var ctx = $('#mynamecanvas');
   

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata
			});

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()





function fillassetrprtcompany (){


  var call_fn ='fillassetrprtcompanyphp';

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&call_fn=' + call_fn,
  success: function(data){

    // alert(data);

  $('#divorgarnisation').html(data);
 

  }

});

}





function fillassetrprtstorecompany (){


  var call_fn ='fillassetrprtstorecompanyphp';

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&call_fn=' + call_fn,
  success: function(data){

    // alert(data);

  $('#divstoresorgarnisation').html(data);
 

  }

});

}






function fillassetrptstores (){


  var call_fn ='fillassetrptstoresphp';
  var asset_id = sessionStorage.getItem('asset_id');

 

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&asset_id=' + asset_id+ '&call_fn=' + call_fn,
  success: function(data){

    

  $('#divstores').html(data);


  }

});

}





function listallcompanystores(company_id){


  var call_fn = 'listallcompanystoresphp';


       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&call_fn=' + call_fn,
      success: function(response){


       $('#listassetnameentries').html(response);
     

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()




function getcompanystoresgraph(company_id){


  var call_fn = 'getcompanystoresgraphphp';
 

       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&call_fn=' + call_fn,
      success: function(data){

        // alert(data);
        var your_data = JSON.parse(data);
       

      var classname = [];
			var classnumber = [];     
     
      
      for (var i = 0; i < your_data.length; i++) {
        classname.push(your_data[i].company_name);
				classnumber.push(your_data[i].store_count);
    } 

      // console.log(your_data.length);

      var chartdata = {
				labels: classname,
				datasets : [
					{
						label: 'Stores',
						backgroundColor: 'rgba(200, 200, 200, 0.75)',
						borderColor: 'rgba((200, 200, 200,  0.75)',
						hoverBackgroundColor: 'rgba((200, 200, 200,  1)',
						hoverBorderColor: 'rgba((200, 200, 200,  1)',
						data: classnumber
					}
				]
      };//chartdata
      

      var ctx = $('#mynamecanvas');
   

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: chartdata
			});

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()



  
function fillrprtstorecountry (){


  var call_fn ='fillrprtstorecountryphp';

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&call_fn=' + call_fn,
  success: function(data){

    // alert(data);

  $('#divcountry').html(data);


  }

});

}



function listallcompanyusers(company_id){


  var call_fn = 'listallcompanyusersphp';


       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&company_id=' + company_id+'&call_fn=' + call_fn,
      success: function(response){

       $('#listassetentries').html(response);
     

    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



}// selectcompanyName ()





function fillassetIIstorecompany (){


  var call_fn ='fillassetIIstorecompanyphp';

  $.ajax({

    url : phpfilename,
    type: "POST",
    data: '&call_fn=' + call_fn,
  success: function(data){

    // alert(data);

  $('#divstoresorgarnisation').html(data);
 

  }

});

}





function loginuser(user_id,passwd_id){


  var call_fn = 'loginuserphp';
 
  
  if (user_id == '' || passwd_id == '') {
 
 
   $("#loginmsg").text('Invalid Login Details');
   document.getElementById("loginmsg").style.display = "block";
 
 
 } else {
 
  
       $.ajax({
      url: phpfilename,
      type: "POST",
      data: '&user_id=' + user_id+'&passwd_id=' + passwd_id+'&call_fn=' + call_fn,
      success: function(response){

       
        var your_data = JSON.parse(response);
       
        var user_id = '';
        var user_level = '';
        var user_name = '';
        var user_company = '';
        var user_store = '';
        
      

 
            if (your_data=="") {
              

              $("#loginmsg").text('Invalid Login Details');
                  document.getElementById("loginmsg").style.display = "block"; 

            } else {

              user_id=your_data[0].user_id;
              user_level=your_data[0].user_level;
              user_name=your_data[1].user_name;
              user_company=your_data[0].user_organisation;
              user_store=your_data[0].user_store;
          
      
              sessionStorage.setItem('user_name', user_name);
              sessionStorage.setItem('user_company', user_company);
              sessionStorage.setItem('user_store', user_store);
              sessionStorage.setItem('user_id', user_id);
             

              if (user_level.indexOf('0') !== -1) {
                  
                // alert(user_level);
                window.location.href = '/ItSupportNormal/';         

              } else if (user_level.indexOf('1') !== -1) {
                
                window.location.href = '/ItSupportStoreManger/';

              } else if (user_level.indexOf('2') !== -1) {
                
                window.location.href = '/ItSupportTech/';

              } else if (user_level.indexOf('3') !== -1) {

                window.location.href = '/ItSupportCompany/';
                
              } else if (user_level.indexOf('4') !== -1) {

            
                window.location.href = '/ItSupport/frontenddashboard.html';
                
              }// Check the level

            }// Check invalid login
     
     
    },
    error: function(jqXHR, textStatus, errorThrown){
      alert(jqXHR.status);
      alert(errorThrown);
      alert(textStatus);


    }
    });



  }//Checking empty fields

}// selectcompanyName ()
