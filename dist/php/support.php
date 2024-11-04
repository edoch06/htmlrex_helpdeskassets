<?php



  define('HOST','localhost');
  define('USER','root');
  define('PASS','');
  define('DB','tracking_system');
  $con = mysqli_connect(HOST,USER,PASS,DB);
  date_default_timezone_set('Africa/Nairobi');




  	 $call_fn = $_POST['call_fn'];
	 $currdate = date("Y-m-d H:i:s");
	 $passwd_salt = '949&%*HJYlyhfytpp&&77----';


	 $call_fn();



function selectAssetTicketNophp(){

		global $con;
		global $currdate;
		global $passwd_salt;



		$datetime = date("Ymd");

		$sql = "SELECT ticket_value +1 FROM track_ticketids where ticket_id='1'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {


				if($data[0] > 997){


						$sql = "UPDATE track_ticketids SET ticket_value = 0 WHERE ticket_id='1'";
						mysqli_query($con, $sql);

				}


			 $num_padded = sprintf("%04d", $data[0]);
			 $organisation = 'ASST - '.$datetime.' - '.$num_padded;

				echo $organisation;

		}




}// selectcompanyIdphp





function fillassetClassphp(){
 //--
		global $con;
		global $currdate;
		global $passwd_salt;



		$sql = "SELECT class_name FROM tracking_assetclass";
		$result = mysqli_query($con, $sql);


// echo $result;

		  	echo "<select class='form-control' id='ass_class'>";


		while($data = mysqli_fetch_row($result)) {

			$ass_class =$data[0];
			$ass_class = ucwords($ass_class);

			echo "<option value='$ass_class'>$ass_class</option>";

		}


		  	echo "<option selected='selected'>$ass_class</option>";
		  	echo "</select>";



}// selectcompanyIdphp











 function enternewassetphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$assetticket = mysqli_real_escape_string($con, $_POST['assetticket']);
		$assetclass = mysqli_real_escape_string($con, $_POST['assetclass']);
		$assetname = mysqli_real_escape_string($con, $_POST['assetname']);
		$assetdescrip = mysqli_real_escape_string($con, $_POST['assetdescrip']);
		$assetmodelno = mysqli_real_escape_string($con, $_POST['assetmodelno']);
		$assetserialno = mysqli_real_escape_string($con, $_POST['assetserialno']);
		$assetlabelno = mysqli_real_escape_string($con, $_POST['assetlabelno']);
		$assetstatus = mysqli_real_escape_string($con, $_POST['assetstatus']);
		$assetorg = mysqli_real_escape_string($con, $_POST['assetorg']);
		$assetstore = mysqli_real_escape_string($con, $_POST['assetstore']);
		$assetcreatedby = mysqli_real_escape_string($con, $_POST['assetcreatedby']);




		$sql = "INSERT INTO tracking_assets (trackass_organisation,trackass_class,trackass_name,trackass_descrip,trackass_modelno,
		trackass_labelno,trackass_serialno,trackass_status,trackass_storeno,trackass_createdby,trackass_created,trackass_updated,trackass_ticketno) VALUES
		('$assetorg','$assetclass','$assetname','$assetdescrip','$assetmodelno','$assetlabelno','$assetserialno','$assetstatus','$assetstore','$assetcreatedby'
	     ,'$currdate','$currdate','$assetticket')";



		if((mysqli_query($con,$sql))){


			$sql = "UPDATE track_ticketids SET ticket_value = ticket_value + 1 WHERE ticket_id='1'";
			mysqli_query($con, $sql);
			echo "success";

		} else {

			// echo (mysqli_query($con,$sql));

			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp






function listallassetsphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);

		$sql = "SELECT trackass_name,trackass_class,trackass_modelno,trackass_serialno,trackass_id,count(incident_ticketno)  FROM
		tracking_assets T1 left join tracking_incidences T2 ON T1.trackass_id=T2.incident_assetid
		WHERE trackass_organisation LIKE '$company_id%' AND trackass_storeno LIKE '$store_id%' 
		AND trackass_deleted='N' GROUP BY trackass_id";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {



					while($data = mysqli_fetch_row($result)) {


				 $trackass_name =$data[0];
				 $trackass_name = (strlen($trackass_name) > 25) ? substr($trackass_name,0,25).'...' : $trackass_name;
				 $trackass_name =ucwords($trackass_name);

				 $trackass_class =$data[1];
				 $trackass_class = (strlen($trackass_class) > 25) ? substr($trackass_class,0,25).'...' : $trackass_class;
				 $trackass_class =ucwords($trackass_class);

				 $trackass_modelno =$data[2];
				 $trackass_modelno = (strlen($trackass_modelno) > 25) ? substr($trackass_modelno,0,25).'...' : $trackass_modelno;
				 $trackass_modelno =strtoupper($trackass_modelno);

				 $trackass_serialno =$data[3];
				 $trackass_serialno = (strlen($trackass_serialno) > 25) ? substr($trackass_serialno,0,25).'...' : $trackass_serialno;
				 $trackass_serialno =strtoupper($trackass_serialno);

				 $trackass_id =$data[4];
				 $trackass_inccount =$data[5];



 	                    echo "<tr>";
                          echo "<td>$trackass_name</td>";
                          echo "<td>$trackass_class</td>";
                          echo "<td>$trackass_modelno</td>";
                          echo "<td>$trackass_serialno</td>";
                          echo "<td>$trackass_inccount</td>";
                          echo "<td><span class='list-buttons' data-toggle='modal' data-target='#newincidenceModal' onclick='javascript:getIncAssetId(\"$trackass_id\");'><span class='create-ticket'>New Ticket</span></span></td>";
                        echo "</tr>";


						}



		}




			mysqli_close($con);



}  // getallCompanyphp



function fillincassetClassphp(){
 //--
		global $con;
		global $currdate;
		global $passwd_salt;



		$sql = "SELECT class_name FROM tracking_assetclass";
		$result = mysqli_query($con, $sql);


// echo $result;

		  	echo "<select class='form-control' id='inc_class'>";


		while($data = mysqli_fetch_row($result)) {

			$ass_class =$data[0];
			$ass_class = ucwords($ass_class);

			echo "<option value='$ass_class'>$ass_class</option>";

		}


		  	echo "<option selected='selected'>$ass_class</option>";
		  	echo "</select>";



}// selectcompanyIdphp





function selectAssetIncTicketNophp(){

		global $con;
		global $currdate;
		global $passwd_salt;



		$datetime = date("Ymd");

		$sql = "SELECT ticket_value +1 FROM track_ticketids where ticket_id='2'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {


				if($data[0] > 997){


						$sql = "UPDATE track_ticketids SET ticket_value = 0 WHERE ticket_id='2'";
						mysqli_query($con, $sql);

				}


			 $num_padded = sprintf("%04d", $data[0]);
			 $organisation = 'INCT - '.$datetime.' - '.$num_padded;

				echo $organisation;

		}




}// selectcompanyIdphp




function selectIncJobAheadphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$companyId= mysqli_real_escape_string($con, $_POST['company_id']);
		$duedate= mysqli_real_escape_string($con, $_POST['duedate']);
		$duedate=str_replace("/","-",$duedate);
		$duedate =date('Y-m-d',strtotime($duedate));
		$priority= mysqli_real_escape_string($con, $_POST['priority']);


		$sql = "SELECT COUNT(incident_ticketno) FROM tracking_incidences WHERE incident_companyid = '$companyId' and DATE(incident_datedue) = '$duedate' and incident_status='open' and incident_priority='$priority'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];


				echo $organisation;
		}




}// selectcompanyIdphp







 function enternewassetincphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$incidentticket = mysqli_real_escape_string($con, $_POST['incidentticket']);
		$incidentcategory = mysqli_real_escape_string($con, $_POST['incidentcategory']);
		$incidentclass = mysqli_real_escape_string($con, $_POST['incidentclass']);
		$incidenttype = mysqli_real_escape_string($con, $_POST['incidenttype']);
		$incidentpriority = mysqli_real_escape_string($con, $_POST['incidentpriority']);
		$incidentsubject = mysqli_real_escape_string($con, $_POST['incidentsubject']);
		$incidentdescrip = mysqli_real_escape_string($con, $_POST['incidentdescrip']);

		$incidentduedate = mysqli_real_escape_string($con, $_POST['incidentduedate']);
		$incidentduedate =str_replace("/","-",$incidentduedate);
	 	$incidentduedate =date('Y-m-d H:i:s',strtotime($incidentduedate));

		$incidentstore = mysqli_real_escape_string($con, $_POST['incidentstore']);
		$incidentcreatedby = mysqli_real_escape_string($con, $_POST['incidentcreatedby']);
		$incidentjobsahead = mysqli_real_escape_string($con, $_POST['incidentjobsahead']);
		$incidentassetid = mysqli_real_escape_string($con, $_POST['incidentassetid']);
		$incidentorg = mysqli_real_escape_string($con, $_POST['incidentorg']);




		$sql = "INSERT INTO tracking_incidences (incident_ticketno,incident_category,incident_subcategory,incident_type,incident_priority,
		incident_date,incident_datedue,incident_narration,incident_jobsahead,incident_assetid,incident_companyid,incident_storeid,
		incident_requesterid,incident_subject) VALUES
		('$incidentticket','$incidentcategory','$incidentclass','$incidenttype','$incidentpriority','$currdate','$incidentduedate',
		'$incidentdescrip','$incidentjobsahead','$incidentassetid','$incidentorg','$incidentstore','$incidentcreatedby','$incidentsubject')";



		if((mysqli_query($con,$sql))){


			$sql = "UPDATE track_ticketids SET ticket_value = ticket_value + 1 WHERE ticket_id='2'";
			mysqli_query($con, $sql);
			echo "success";

		} else {

			// echo (mysqli_query($con,$sql));

			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp





function selectIncAssetDetailsphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$selectid= mysqli_real_escape_string($con, $_POST['selectid']);


		$sql = "SELECT $selectcol FROM tracking_assets WHERE trackass_id = '$selectid'";
		$result = mysqli_query($con, $sql);



		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];


				echo $organisation;
		}




}// selectcompanyIdphp






function listallassetspagephp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		 $record_per_page = 30;
		 $page = '';
		 $output = '';


		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
		$page = mysqli_real_escape_string($con, $_POST['page']);

		if ($page =='') {

				$page=1;
		}

		$start_from = ($page - 1) * $record_per_page;

		$sql = "SELECT trackass_name,trackass_class,trackass_modelno,trackass_serialno,trackass_id,count(incident_ticketno)  FROM
		 tracking_assets T1 left join tracking_incidences T2 ON T1.trackass_id=T2.incident_assetid WHERE trackass_organisation='$company_id'
		 AND trackass_deleted='N' GROUP BY trackass_id LIMIT $start_from, $record_per_page";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {



					while($data = mysqli_fetch_row($result)) {


				 $trackass_name =$data[0];
				 $trackass_name =ucwords($trackass_name);
				 $trackass_class =$data[1];
				 $trackass_class =ucwords($trackass_class);
				 $trackass_modelno =$data[2];
				 $trackass_modelno =strtoupper($trackass_modelno);
				 $trackass_serialno =$data[3];
				 $trackass_serialno =strtoupper($trackass_serialno);
				 $trackass_id =$data[4];
				 $trackass_inccount =$data[5];



 	               $output .= "
 	               		<tr>
                          <td>$trackass_name</td>
                          <td>$trackass_class</td>
                          <td>$trackass_modelno</td>
                          <td>$trackass_serialno</td>
                          <td>$trackass_inccount</td>
                          <td><span class='fa fa-calendar list-buttons' data-toggle='modal' data-target='#newincidenceModal'
                          onclick='javascript:getIncAssetId(\"$trackass_id\");'>&nbsp;&nbsp;</span></td>
                        </tr>

                        ";

						}


						 $page_query = "SELECT trackass_name,trackass_class,trackass_modelno,trackass_serialno,trackass_id,count(incident_ticketno)  FROM
						 tracking_assets T1 left join tracking_incidences T2 ON T1.trackass_id=T2.incident_assetid WHERE trackass_organisation='$company_id'
						 AND trackass_deleted='N' GROUP BY trackass_id";
						 $page_result = mysqli_query($con, $page_query);
						 $total_records = mysqli_num_rows($page_result);
						 $total_pages = ceil($total_records/$record_per_page);

						  for($i=1; $i<=$total_pages; $i++)
							 {
      							// $output .= "<span class='pagination_link' style='cursor:pointer; padding:6px; border:1px solid #ccc;' id='".$i."'>".$i."</span>";

                               $output .= "<nav aria-label='...'>
                                  <ul class='pagination'>
                                    <li class='page-item'>
                                      <a class='page-link' href='#' id='".$i."'>".$i."</a>
                                    </li>
                                  </ul>
                                </nav>";
 							 }


						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp





function listallmanageincphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);

		$sql = "SELECT incident_category,incident_subcategory,incident_type,incident_priority,incident_closed,incident_jobcard,incident_datedue
		,incident_id,trackass_serialno  FROM
		 tracking_incidences T1 left join tracking_assets T2 ON T1.incident_assetid=T2.trackass_id 
		 WHERE incident_companyid LIKE '$company_id%' AND incident_storeid LIKE '$store_id%' 
		 AND incident_cancelled='N' GROUP BY incident_id order by incident_id desc";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {



					while($data = mysqli_fetch_row($result)) {


				 $incidence_category =$data[0];
				 $incidence_category = (strlen($incidence_category) > 15) ? substr($incidence_category,0,15).'...' : $incidence_category;
				 $incidence_category =ucwords($incidence_category);

				 $incidence_class =$data[1];
				 $incidence_class = (strlen($incidence_class) > 15) ? substr($incidence_class,0,15).'...' : $incidence_class;
				 $incidence_class =ucwords($incidence_class);

				 $incidence_type =$data[2];
				 $incidence_type = (strlen($incidence_type) > 15) ? substr($incidence_type,0,15).'...' : $incidence_type;
				 $incidence_type =ucwords($incidence_type);

				 $incidence_priority =$data[3];
				 $incidence_priority =ucwords($incidence_priority);
				 $incidence_closed =$data[4];

				 if ($incidence_closed=='Y') {

					    $incidence_closed = "<input type='checkbox'  value='$data[7]' checked disabled>";

					   }

					  else {

						$incidence_closed = "<input type='checkbox'  value='$data[7]'>";

					  }

				 $incidence_jobcard =$data[5];

				 	 if ($incidence_jobcard=='Y') {

					    $incidence_jobcard = "<input type='checkbox'  value='$data[7]' checked>";

					   }

					  else {

						$incidence_jobcard = "<input type='checkbox'  value='$data[7]'>";

					  }

				 $incidence_datedue =$data[6];
				 $incidence_datedue =date('d/m/Y',strtotime($incidence_datedue));
				 $incident_id =$data[7];
				 $incidence_assetsno =$data[8];
				 $incidence_assetsno =strtoupper($incidence_assetsno);



						$output .= "
        			    <tr>
                          <td>$incidence_category</td>
                          <td>$incidence_class</td>
                          <td>$incidence_assetsno</td>
                          <td>$incidence_type</td>
                          <td>$incidence_priority</td>
                          <td>$incidence_closed</td>
                          <td>$incidence_jobcard</td>
                          <td>$incidence_datedue</td>
                          <td><span class='list-buttons' >
                          <span class='create-ticket' data-toggle='modal' data-target='#editIncModal' onclick='javascript:getViewInc(\"$incident_id\");'>
                          Details</span>&nbsp;&nbsp;
                          <span class='create-ticket' data-toggle='modal' data-target='#cancelIncModal' onclick='javascript:getRemoveInc(\"$incident_id\");' data-toggle='tooltip'>
                          Cancel</span></span></td>
                        </tr>
						";



						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp




function selectAssetDetailsAssetphp(){

	   global $con;
	   global $company_session;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



		$sql = "SELECT $selectcol FROM tracking_assets where trackass_id='$asset_id'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}





function selectIncidentDetailsphp(){

	   global $con;
	   global $company_session;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$incident_id= mysqli_real_escape_string($con, $_POST['incident_id']);



		$sql = "SELECT $selectcol FROM tracking_incidences where incident_id='$incident_id'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}




function selectIncidentDatephp(){

	   global $con;
	   global $company_session;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$incident_id= mysqli_real_escape_string($con, $_POST['incident_id']);



		$sql = "SELECT $selectcol FROM tracking_incidences where incident_id='$incident_id'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {


			 $organisation = $data[0];
			 $organisation =date('d/m/Y',strtotime($organisation));
				echo $organisation;

		}




}// selectcompanyIdphp





function selectAssetDetailsphp(){

	   global $con;
	   global $company_session;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$assetid= mysqli_real_escape_string($con, $_POST['assetid']);



		$sql = "SELECT $selectcol FROM tracking_assets where trackass_id='$assetid'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}




function selectUserNamephp(){

	   global $con;
	   global $company_session;



		$userid= mysqli_real_escape_string($con, $_POST['userid']);



		$sql = "SELECT CONCAT(user_firstname,' ',user_lastname) as user_name FROM tracking_users where user_id='$userid'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
			 $organisation = ucwords($organisation);
				 echo $organisation;
		}




}




function deleteIncidencephp(){

	   global $con;
	   global $company_session;



		$incident_id= mysqli_real_escape_string($con, $_POST['incident_id']);



		$sql = "UPDATE tracking_incidences SET incident_cancelled = 'Y' where incident_id='$incident_id'";
		$result = mysqli_query($con, $sql);





}




function enableColumnsphp(){

	   global $con;
	   global $company_session;



		$table_name= mysqli_real_escape_string($con, $_POST['tablename']);
		$row_id= mysqli_real_escape_string($con, $_POST['rowid']);
		$id_col= mysqli_real_escape_string($con, $_POST['idcol']);
		$update_col= mysqli_real_escape_string($con, $_POST['updatecol']);
		$update_val= mysqli_real_escape_string($con, $_POST['updateval']);




		$sql = "UPDATE $table_name SET $update_col = '$update_val' where $id_col='$row_id'";
		$result = mysqli_query($con, $sql);





}






function listmarkedjobsphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);


		$sql = "SELECT incident_subcategory,incident_narration,incident_closed,trackass_name,trackass_serialno  FROM
		 tracking_incidences T1 left join tracking_assets T2 ON T1.incident_assetid=T2.trackass_id WHERE incident_companyid='$company_id'
		 AND incident_jobcard='Y' GROUP BY incident_id order by incident_id desc";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {



					while($data = mysqli_fetch_row($result)) {


				 $job_class =$data[0];
				 $job_class = (strlen($job_class) > 15) ? substr($job_class,0,15).'...' : $job_class;
				 $job_class =ucwords($job_class);

				 $job_descrip =$data[1];
				 $job_descrip = (strlen($job_descrip) > 30) ? substr($job_descrip,0,30).'...' : $job_descrip;
				 $job_descrip =ucwords($job_descrip);

				 $job_closed =$data[2];

				 	 if ($job_closed=='Y') {

					    $job_closed = "<span class='fa fa-check'>&nbsp;</span>";

					   }

					  else {

						$job_closed = "<span class='fa fa-remove'>&nbsp;</span>";

					  }

				 $job_assetname =$data[3];
				 $job_assetname = (strlen($job_assetname) > 20) ? substr($job_assetname,0,20).'...' : $job_assetname;
				 $job_assetname =ucwords($job_assetname);



				 $job_assetsno =$data[4];
				 $job_assetsno = (strlen($job_assetsno) > 20) ? substr($job_assetsno,0,20).'...' : $job_assetsno;
				 $job_assetsno =strtoupper($job_assetsno);



					$output .= "
 					  <tr>
                        <td>$job_class</td>
                        <td>$job_assetname</td>
                        <td>$job_assetsno</td>
                        <td>$job_descrip</td>
                        <td>$job_closed</td>
                      </tr>
                      ";



						}


					echo $output;

		}




			mysqli_close($con);



}  // getallCompanyphp






function selectJobCardNophp(){

		global $con;
		global $currdate;
		global $passwd_salt;



		$datetime = date("Ymd");

		$sql = "SELECT ticket_value +1 FROM track_ticketids where ticket_id='3'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {


				if($data[0] > 997){


						$sql = "UPDATE track_ticketids SET ticket_value = 0 WHERE ticket_id='3'";
						mysqli_query($con, $sql);

				}


			 $num_padded = sprintf("%04d", $data[0]);
			 $organisation = 'JOBC - '.$datetime.' - '.$num_padded;

				echo $organisation;

		}




}// selectcompanyIdphp








 function jobCardJobphp(){

		global $con;
		global $currdate;
		global $passwd_salt;




		$sql = "UPDATE track_ticketids SET ticket_value = ticket_value + 1 WHERE ticket_id='3'";


		if((mysqli_query($con,$sql))){


			echo "success";


		} else {


			echo "failed";

		}


			mysqli_close($con);



}// submit_companydetailsphp




function selectStoreDetailsNamephp(){

	    global $con;
		global $currdate;
		global $passwd_salt;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$store_id= mysqli_real_escape_string($con, $_POST['store_id']);



		$sql = "SELECT $selectcol FROM tracking_stores where store_id='$store_id'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
			 $organisation = ucwords($organisation);
				 echo $organisation;
		}




}




function selectJobCardCountphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$store_id= mysqli_real_escape_string($con, $_POST['store_id']);

		$sql = "SELECT COUNT(incident_ticketno) FROM tracking_incidences WHERE incident_storeid = '$store_id' and incident_jobcard='Y'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];


				echo $organisation;
		}




}// selectcompanyIdphp



 function jobCardJobPrntphp(){

		global $con;
		global $currdate;
		global $passwd_salt;




		$sql = "UPDATE tracking_incidences SET incident_jobcard = 'N' WHERE incident_jobcard='Y'";



		if((mysqli_query($con,$sql))){

			echo "success";

		} else {


			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp






function fillreqClassphp(){
 //--
		global $con;
		global $currdate;
		global $passwd_salt;



		$sql = "SELECT class_name FROM tracking_assetclass";
		$result = mysqli_query($con, $sql);


// echo $result;

		  	echo "<select class='form-control' id='req_class'>";


		while($data = mysqli_fetch_row($result)) {

			$ass_class =$data[0];
			$ass_class = ucwords($ass_class);

			echo "<option value='$ass_class'>$ass_class</option>";

		}


		  	echo "<option selected='selected'>$ass_class</option>";
		  	echo "</select>";



}// selectcompanyIdphp






function selectReqTicketNophp(){

		global $con;
		global $currdate;
		global $passwd_salt;



		$datetime = date("Ymd");

		$sql = "SELECT ticket_value +1 FROM track_ticketids where ticket_id='4'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {


				if($data[0] > 997){


						$sql = "UPDATE track_ticketids SET ticket_value = 0 WHERE ticket_id='4'";
						mysqli_query($con, $sql);

				}


			 $num_padded = sprintf("%04d", $data[0]);
			 $organisation = 'REQT - '.$datetime.' - '.$num_padded;

				echo $organisation;

		}




}// selectcompanyIdphp






 function enternewrequestphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$reqticket = mysqli_real_escape_string($con, $_POST['reqticket']);
		$reqclass = mysqli_real_escape_string($con, $_POST['reqclass']);
		$reqitemname = mysqli_real_escape_string($con, $_POST['reqitemname']);
		$reqqnty = mysqli_real_escape_string($con, $_POST['reqqnty']);
		$reqtype = mysqli_real_escape_string($con, $_POST['reqtype']);
		$reqdescrip = mysqli_real_escape_string($con, $_POST['reqdescrip']);
		$reqdatedue = mysqli_real_escape_string($con, $_POST['reqdatedue']);
		$reqdatedue=str_replace("/","-",$reqdatedue);
		$reqdatedue =date('Y-m-d',strtotime($reqdatedue));
		$reqorg = mysqli_real_escape_string($con, $_POST['reqorg']);
		$reqstore = mysqli_real_escape_string($con, $_POST['reqstore']);
		$reqcreatedby = mysqli_real_escape_string($con, $_POST['reqcreatedby']);




		$sql = "INSERT INTO tracking_requests (request_ticketno,request_itemclass,request_itemname,request_quantity,request_type,request_descrip,
		request_date,request_datedue,request_requesterorg,request_requesterstore,request_requesterid) VALUES
		('$reqticket','$reqclass','$reqitemname','$reqqnty','$reqtype','$reqdescrip','$currdate','$reqdatedue','$reqorg','$reqstore','$reqcreatedby')";



		if((mysqli_query($con,$sql))){


			$sql = "UPDATE track_ticketids SET ticket_value = ticket_value + 1 WHERE ticket_id='4'";
			mysqli_query($con, $sql);
			echo "success";

		} else {

			// echo (mysqli_query($con,$sql));

			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp








function listallrequestsphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);
		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);

		$sql = "SELECT request_ticketno,request_itemclass,request_itemname,request_quantity,request_datedue,request_closed,
		request_id  FROM tracking_requests
		WHERE request_requesterorg LIKE '$company_id%' and request_requesterstore LIKE '$store_id%' and  request_cancelled = 'N' order by request_date desc";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {



					while($data = mysqli_fetch_row($result)) {


				 $request_ticketno =$data[0];


				 $request_itemclass =$data[1];
				 $request_itemclass = (strlen($request_itemclass) > 20) ? substr($request_itemclass,0,20).'...' : $request_itemclass;
				 $request_itemclass =ucwords($request_itemclass);



				 $request_itemname =$data[2];
				 $request_itemname = (strlen($request_itemname) > 30) ? substr($request_itemname,0,30).'...' : $request_itemname;
				 $request_itemname =ucwords($request_itemname);



				 $request_quantity =$data[3];

				 $request_datedue =$data[4];
				 $request_datedue =date('d/m/Y',strtotime($request_datedue));

				$request_closed =$data[5];


				 if ($request_closed=='Y') {

					    $request_closed = "<input type='checkbox'  value='$data[6]' checked disabled>";

					   }

					  else {

						$request_closed = "<input type='checkbox'  value='$data[6]'>";

					  }

				$request_id =$data[6];


						$output .= "
        			    <tr>
                          <td>$request_ticketno</td>
                          <td>$request_itemclass</td>
                          <td>$request_itemname</td>
                          <td>$request_quantity</td>
                          <td>$request_datedue</td>
                          <td>$request_closed </td>
                          <td><span class='list-buttons' >
                          </span></td>
                        </tr>
						";



						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp



function selectRequestDetailsphp(){

	   global $con;
	   global $company_session;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$request_id= mysqli_real_escape_string($con, $_POST['request_id']);



		$sql = "SELECT $selectcol FROM tracking_requests where request_id='$request_id'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}





function selectRequestDatephp(){

	   global $con;
	   global $company_session;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$request_id= mysqli_real_escape_string($con, $_POST['request_id']);



		$sql = "SELECT $selectcol FROM tracking_requests where request_id='$request_id'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {


			 $organisation = $data[0];
			 $organisation =date('d/m/Y',strtotime($organisation));
				echo $organisation;

		}




}// selectcompanyIdphp




function deleteRequestphp(){

	   global $con;
	   global $company_session;



		$request_id= mysqli_real_escape_string($con, $_POST['request_id']);



		$sql = "UPDATE tracking_requests SET request_cancelled = 'Y' where request_id='$request_id'";
		$result = mysqli_query($con, $sql);





}






function listallassetsentriesphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);
		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);


		$sql = "SELECT trackass_class,trackass_name,trackass_modelno,trackass_serialno,trackass_labelno,trackass_created,trackass_id,trackass_sent  FROM
		 tracking_assets WHERE trackass_organisation LIKE '$company_id%' AND trackass_storeno LIKE '$store_id%'
		 AND trackass_deleted='N' GROUP BY trackass_id";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {


			while($data = mysqli_fetch_row($result)) {



				 $trackass_class =$data[0];
				 $trackass_class = (strlen($trackass_class) > 18) ? substr($trackass_class,0,18).'...' : $trackass_class;
				 $trackass_class =ucwords($trackass_class);



				 $trackass_name =$data[1];
				 $trackass_name = (strlen($trackass_name) > 30) ? substr($trackass_name,0,30).'...' : $trackass_name;
				 $trackass_name =ucwords($trackass_name);



				 $trackass_modelno =$data[2];
				 $trackass_modelno = (strlen($trackass_modelno) > 15) ? substr($trackass_modelno,0,15).'...' : $trackass_modelno;
				 $trackass_modelno =ucwords($trackass_modelno);



				 $trackass_serialno =$data[3];
				 $trackass_serialno = (strlen($trackass_serialno) > 18) ? substr($trackass_serialno,0,18).'...' : $trackass_serialno;
				 $trackass_serialno =strtoupper($trackass_serialno);


				 $trackass_labelno =$data[4];
				 $trackass_labelno = (strlen($trackass_labelno) > 15) ? substr($trackass_labelno,0,15).'...' : $trackass_labelno;
				 $trackass_labelno =ucwords($trackass_labelno);


				$trackass_created =$data[5];
				$trackass_created =date('d/m/Y',strtotime($trackass_created));



				$trackass_sent =$data[7];


				 if ($trackass_sent=='Y') {

					    $trackass_sent = "<input type='checkbox'  value='$data[6]' checked disabled>";

					   }

					  else {

						$trackass_sent = "<input type='checkbox'  value='$data[6]'>";

					  }



				$trackass_id =$data[6];





						$output .= "
        			    <tr>
                          <td>$trackass_class</td>
                          <td>$trackass_name</td>
                          <td>$trackass_modelno</td>
                          <td>$trackass_serialno</td>
                          <td>$trackass_labelno</td>
                          <td>$trackass_created</td>
                          <td>$trackass_sent</td>
                          <td><span class='list-buttons' >
                          <span class='create-ticket' data-toggle='modal' data-target='#editassetModal' onclick='javascript:getEditAsset(\"$trackass_id\");'>
                          Edit</span>&nbsp;&nbsp;
                          <span class='create-ticket' data-toggle='modal' data-target='#delAssetModal' onclick='javascript:getRemoveReq(\"$trackass_id\");'>
                          Delete</span></span></td>
                        </tr>
						";



						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp





function fillsendStorephp(){
 //--
		global $con;
		global $currdate;
		global $passwd_salt;



		$sql = "SELECT store_name,store_id FROM tracking_stores";
		$result = mysqli_query($con, $sql);




		  	echo "<select class='form-control' id='store_id'>";


		while($data = mysqli_fetch_row($result)) {

			$store_name =$data[0];
			$store_name = ucwords($store_name);

			$store_id =$data[1];

			echo "<option value='$store_id'>$store_name</option>";

		}


		  	echo "<option selected='selected' value='$store_id'>$store_name</option>";
		  	echo "</select>";



}// selectcompanyIdphp




function sendAssetsphp(){

	    global $con;
		global $currdate;
		global $passwd_salt;



		$to_company= mysqli_real_escape_string($con, $_POST['to_company']);
		$rowid= mysqli_real_escape_string($con, $_POST['rowid']);


		// duplicate rows
		// copying rows from table
		$sql = "INSERT INTO tracking_sentitems (sentitems_ticketno,sentitems_class,sentitems_name,sentitems_descrip,sentitems_modelno,sentitems_serialno,
		sentitems_labelno,sentitems_status,sentitems_fromstoreid,sentitems_tostoreid,sentitems_datesent,sentitems_sent) SELECT trackass_ticketno,trackass_class,trackass_name,trackass_descrip,trackass_modelno,trackass_serialno,trackass_labelno,trackass_status,trackass_storeno,
			'$to_company','$currdate','Y' FROM tracking_assets WHERE trackass_id='$rowid'";

		if((mysqli_query($con,$sql))){


			$sql = "UPDATE tracking_assets SET trackass_sent = 'Y' WHERE trackass_id='$rowid'";
			mysqli_query($con, $sql);
			echo "success";


		} else {

			// echo (mysqli_query($con,$sql));

			echo "failed";

		}





}







function unsendAssets(){

	    global $con;
		global $currdate;
		global $passwd_salt;



		$to_company= mysqli_real_escape_string($con, $_POST['to_company']);
		$rowid= mysqli_real_escape_string($con, $_POST['rowid']);



		$sql = "UPDATE tracking_assets SET trackass_sent = 'N' where trackass_id='$rowid'";
		if((mysqli_query($con,$sql))){




			echo "success";

		} else {

			// echo (mysqli_query($con,$sql));

			echo "failed";

		}





}



function filleditassetClassphp(){
 //--
		global $con;
		global $currdate;
		global $passwd_salt;



		$sql = "SELECT class_name FROM tracking_assetclass";
		$result = mysqli_query($con, $sql);


// echo $result;

		  	echo "<select class='form-control' id='edit_class'>";


		while($data = mysqli_fetch_row($result)) {

			$ass_class =$data[0];
			$ass_class = ucwords($ass_class);

			echo "<option value='$ass_class'>$ass_class</option>";

		}


		  	echo "<option selected='selected'>$ass_class</option>";
		  	echo "</select>";



}// selectcompanyIdphp







 function editnewassetphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$assetid = mysqli_real_escape_string($con, $_POST['assetid']);
		$assetclass = mysqli_real_escape_string($con, $_POST['assetclass']);
		$assetname = mysqli_real_escape_string($con, $_POST['assetname']);
		$assetdescrip = mysqli_real_escape_string($con, $_POST['assetdescrip']);
		$assetmodelno = mysqli_real_escape_string($con, $_POST['assetmodelno']);
		$assetserialno = mysqli_real_escape_string($con, $_POST['assetserialno']);
		$assetlabelno = mysqli_real_escape_string($con, $_POST['assetlabelno']);
		$assetstatus = mysqli_real_escape_string($con, $_POST['assetstatus']);
		$assetcreatedby = mysqli_real_escape_string($con, $_POST['assetcreatedby']);




		$sql = "UPDATE track_ticketids SET trackass_class = '$assetclass',trackass_name = '$assetname',trackass_descrip = '$assetdescrip'
		,trackass_modelno = '$assetmodelno',trackass_labelno = '$assetlabelno',trackass_serialno = '$assetserialno',trackass_createdby = '$assetcreatedby'
		,trackass_status = '$assetstatus' WHERE trackass_id='$assetid'";

		if((mysqli_query($con,$sql))){


			echo "success";

		} else {


			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp






function listallsentassetsphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);


		$sql = "SELECT sentitems_class,sentitems_name,sentitems_modelno,sentitems_serialno,sentitems_labelno,sentitems_datesent,sentitems_id  FROM
		 tracking_sentitems WHERE sentitems_fromstoreid LIKE '$store_id%' GROUP BY sentitems_id";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {


			while($data = mysqli_fetch_row($result)) {



				 $trackass_class =$data[0];
				 $trackass_class = (strlen($trackass_class) > 18) ? substr($trackass_class,0,18).'...' : $trackass_class;
				 $trackass_class =ucwords($trackass_class);



				 $trackass_name =$data[1];
				 $trackass_name = (strlen($trackass_name) > 30) ? substr($trackass_name,0,30).'...' : $trackass_name;
				 $trackass_name =ucwords($trackass_name);



				 $trackass_modelno =$data[2];
				 $trackass_modelno = (strlen($trackass_modelno) > 15) ? substr($trackass_modelno,0,15).'...' : $trackass_modelno;
				 $trackass_modelno =ucwords($trackass_modelno);



				 $trackass_serialno =$data[3];
				 $trackass_serialno = (strlen($trackass_serialno) > 18) ? substr($trackass_serialno,0,18).'...' : $trackass_serialno;
				 $trackass_serialno =strtoupper($trackass_serialno);


				 $trackass_labelno =$data[4];
				 $trackass_labelno = (strlen($trackass_labelno) > 15) ? substr($trackass_labelno,0,15).'...' : $trackass_labelno;
				 $trackass_labelno =ucwords($trackass_labelno);


				$trackass_created =$data[5];
				$trackass_created =date('d/m/Y',strtotime($trackass_created));



				$trackass_id =$data[6];





						$output .= "
        			    <tr>
                          <td>$trackass_class</td>
                          <td>$trackass_name</td>
                          <td>$trackass_modelno</td>
                          <td>$trackass_serialno</td>
                          <td>$trackass_labelno</td>
                          <td>$trackass_created</td>
                          <td><span class='list-buttons' >
                          <span class='create-ticket' data-toggle='modal' data-target='#editassetModal' onclick='javascript:getViewRcvAsset(\"$trackass_id\");'>
                          Details</span></span></td>
                        </tr>
						";



						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp






function listallrcvdassetsphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);


		$sql = "SELECT sentitems_class,sentitems_name,sentitems_modelno,sentitems_serialno,sentitems_labelno,sentitems_datesent,sentitems_id,
		sentitems_received,sentitems_datereceived  FROM
		tracking_sentitems WHERE sentitems_fromstoreid LIKE '$store_id%'
		 or sentitems_tostoreid LIKE '$store_id%' GROUP BY sentitems_id";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {


			while($data = mysqli_fetch_row($result)) {



				 $trackass_class =$data[0];
				 $trackass_class = (strlen($trackass_class) > 10) ? substr($trackass_class,0,10).'...' : $trackass_class;
				 $trackass_class =ucwords($trackass_class);



				 $trackass_name =$data[1];
				 $trackass_name = (strlen($trackass_name) > 10) ? substr($trackass_name,0,10).'...' : $trackass_name;
				 $trackass_name =ucwords($trackass_name);



				 $trackass_serialno =$data[3];
				 $trackass_serialno = (strlen($trackass_serialno) > 18) ? substr($trackass_serialno,0,18).'...' : $trackass_serialno;
				 $trackass_serialno =strtoupper($trackass_serialno);


				 $trackass_labelno =$data[4];
				 $trackass_labelno = (strlen($trackass_labelno) > 15) ? substr($trackass_labelno,0,15).'...' : $trackass_labelno;
				 $trackass_labelno =ucwords($trackass_labelno);


				$trackass_sent =$data[5];
				$trackass_sent =date('d/m/Y',strtotime($trackass_sent));


				$trackass_rcvd =$data[8];
				$trackass_rcvd =date('d/m/Y',strtotime($trackass_rcvd));


				if ($data[8] < $data[5]) {

					    $trackass_rcvd = "---";

					   }

					  else {

						$trackass_rcvd =$data[8];
						$trackass_rcvd =date('d/m/Y',strtotime($trackass_rcvd));

					  }


				$trackass_id =$data[6];


				$trackass_status =$data[7];


				 if ($trackass_status=='Y') {

					    $trackass_status = "<input type='checkbox'  value='$data[6]' checked disabled>";

					   }

					  else {

						$trackass_status = "<input type='checkbox'  value='$data[6]'>";

					  }



						$output .= "
        			    <tr>
                          <td>$trackass_class</td>
                          <td>$trackass_name</td>
                          <td>$trackass_serialno</td>
                          <td>$trackass_labelno</td>
                          <td>$trackass_sent</td>
                          <td>$trackass_rcvd</td>
                          <td>$trackass_status</td>
                          <td><span class='list-buttons' >
                          <span class='create-ticket' data-toggle='modal' data-target='#editassetModal' onclick='javascript:getViewRcvAsset(\"$trackass_id\");'>
                          Details</span></td>
                        </tr>
						";



						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp







 function recceivedAssetphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$editid = mysqli_real_escape_string($con, $_POST['editid']);
		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);
		$created_by = mysqli_real_escape_string($con, $_POST['created_by']);




		$sql = "UPDATE tracking_sentitems SET sentitems_received = 'Y',sentitems_datereceived = '$currdate' WHERE sentitems_id='$editid'";

		if((mysqli_query($con,$sql))){


			$sql = "UPDATE tracking_assets set trackass_sent='N',trackass_createdby='$created_by',trackass_storeno='$store_id' where
			trackass_ticketno = (select sentitems_ticketno from tracking_sentitems where sentitems_id = '$editid')";
			mysqli_query($con, $sql);

			echo "success";

		} else {


			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp






function selectToolTicketNophp(){

		global $con;
		global $currdate;
		global $passwd_salt;



		$datetime = date("Ymd");

		$sql = "SELECT ticket_value +1 FROM track_ticketids where ticket_id='5'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {


				if($data[0] > 997){


						$sql = "UPDATE track_ticketids SET ticket_value = 0 WHERE ticket_id='5'";
						mysqli_query($con, $sql);

				}


			 $num_padded = sprintf("%04d", $data[0]);
			 $organisation = 'TOOL - '.$datetime.' - '.$num_padded;

				echo $organisation;

		}




}// selectcompanyIdphp





 function enternewtoolsphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$assetticket = mysqli_real_escape_string($con, $_POST['assetticket']);
		$assetclass = mysqli_real_escape_string($con, $_POST['assetclass']);
		$assetname = mysqli_real_escape_string($con, $_POST['assetname']);
		$assetdescrip = mysqli_real_escape_string($con, $_POST['assetdescrip']);
		$assetmodelno = mysqli_real_escape_string($con, $_POST['assetmodelno']);
		$assetserialno = mysqli_real_escape_string($con, $_POST['assetserialno']);
		$assetlabelno = mysqli_real_escape_string($con, $_POST['assetlabelno']);
		$assetstatus = mysqli_real_escape_string($con, $_POST['assetstatus']);
		$assetorg = mysqli_real_escape_string($con, $_POST['assetorg']);
		$assetstore = mysqli_real_escape_string($con, $_POST['assetstore']);
		$assetcreatedby = mysqli_real_escape_string($con, $_POST['assetcreatedby']);




		$sql = "INSERT INTO tracking_tools (tools_orgarnisation,tools_class,tools_name,tools_descrip,tools_modelno,
		tools_labelno,tools_serialno,tools_status,tools_store,tools_createdby,tools_created,tools_ticketno) VALUES
		('$assetorg','$assetclass','$assetname','$assetdescrip','$assetmodelno','$assetlabelno','$assetserialno','$assetstatus','$assetstore','$assetcreatedby'
	     ,'$currdate','$assetticket')";



		if((mysqli_query($con,$sql))){


			$sql = "UPDATE track_ticketids SET ticket_value = ticket_value + 1 WHERE ticket_id='5'";
			mysqli_query($con, $sql);

			echo "success";

		} else {

			// echo (mysqli_query($con,$sql));

			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp










function listalltoolentriesphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);


		$sql = "SELECT tools_name,tools_ticketno,tools_created,tools_datesent,tools_datercvd,tools_sent,tools_rcvd,tools_id,tools_dispatcher  FROM
		 tracking_tools WHERE tools_orgarnisation LIKE '$company_id%' AND tools_store LIKE '$store_id%' 
		 GROUP BY tools_id";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {


			while($data = mysqli_fetch_row($result)) {




				 $trackass_name =$data[0];
				 $trackass_name = (strlen($trackass_name) > 15) ? substr($trackass_name,0,15).'...' : $trackass_name;
				 $trackass_name =ucwords($trackass_name);


				 $trackass_no =$data[1];
				 $trackass_no = (strlen($trackass_no) > 15) ? substr($trackass_no,0,15).'...' : $trackass_no;
				 $trackass_no =ucwords($trackass_no);


				$trackass_created =$data[2];
				$trackass_created =date('d/m/Y',strtotime($trackass_created));


				$trackass_datesent = '';
				$trackass_datercvd ='';




				if ($data[3] < $data[2]) {

					    $trackass_datesent = "---";

					   }

					  else {

						$trackass_datesent =$data[3];
						$trackass_datesent =date('d/m/Y',strtotime($trackass_datesent));

					  }



					  if ($data[4] <= $data[3]) {

					    $trackass_datercvd = "---";

					   }

					  else {

						$trackass_datercvd =$data[3];
						$trackass_datercvd =date('d/m/Y',strtotime($trackass_datercvd));


					  }







				$trackass_sent =$data[5];


				 if ($trackass_sent=='Y') {

					    $trackass_sent = "<input type='checkbox'  value='$data[7]' checked disabled>";

					   }

				  else {

					$trackass_sent = "<input type='checkbox'  value='$data[7]'>";

				  }



					$trackass_rcvd =$data[6];

				  if ($trackass_rcvd=='Y') {

					    $trackass_rcvd = "<input type='checkbox'  value='$data[7]' checked disabled>";

					   }

				  else {

					$trackass_rcvd = "<input type='checkbox'  value='$data[7]'>";

				  }


				 $trackass_dispatcher =$data[8];

				 if ($trackass_dispatcher=='') {

					    $trackass_dispatcher = "---";

					   }

				  else {

				$trackass_dispatcher = (strlen($trackass_dispatcher) > 10) ? substr($trackass_dispatcher,0,10).'...' : $trackass_dispatcher;
				 $trackass_dispatcher =ucwords($trackass_dispatcher);

				  }


				 $trackass_id =$data[7];



						$output .= "
        			    <tr>
                          <td>$trackass_name</td>
                          <td>$trackass_no</td>
                          <td>$trackass_created</td>
                          <td>$trackass_datesent</td>
                          <td>$trackass_datercvd</td>
                          <td>$trackass_dispatcher</td>
                          <td>$trackass_sent</td>
                          <td>$trackass_rcvd</td>
                          <td><span class='list-buttons' >
                          <span class='create-ticket' data-toggle='modal' data-target='#edittoolModal' onclick='javascript:getEditTool(\"$trackass_id\");'>
                          Edit</span></span></td>
                        </tr>
						";



						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp







 function checkoutToolphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$editid = mysqli_real_escape_string($con, $_POST['editid']);
		$dispatcherid = mysqli_real_escape_string($con, $_POST['dispatcherid']);
		$created_by = mysqli_real_escape_string($con, $_POST['created_by']);



		$sql = "UPDATE tracking_tools SET tools_sent = 'Y',tools_rcvd = 'N',tools_dispatcher = '$dispatcherid',tools_createdby = '$created_by',
		tools_datesent = '$currdate' WHERE tools_id='$editid'";

		if((mysqli_query($con,$sql))){


			// $sql = "UPDATE tracking_assets set trackass_sent='N',trackass_createdby='$created_by',trackass_storeno='$store_id' where
			// trackass_ticketno = (select sentitems_ticketno from tracking_sentitems where sentitems_id = '$editid')";
			// mysqli_query($con, $sql);

			echo "success";

		} else {


			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp





 function checkInToolphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$editid = mysqli_real_escape_string($con, $_POST['editid']);
		$created_by = mysqli_real_escape_string($con, $_POST['created_by']);



		$sql = "UPDATE tracking_tools SET tools_sent = 'N',tools_rcvd = 'Y',tools_createdby = '$created_by',
		tools_datercvd = '$currdate' WHERE tools_id='$editid'";

		if((mysqli_query($con,$sql))){


			// $sql = "UPDATE tracking_assets set trackass_sent='N',trackass_createdby='$created_by',trackass_storeno='$store_id' where
			// trackass_ticketno = (select sentitems_ticketno from tracking_sentitems where sentitems_id = '$editid')";
			// mysqli_query($con, $sql);

			echo "success";

		} else {


			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp





function selectUtilTicketNophp(){

		global $con;
		global $currdate;
		global $passwd_salt;



		$datetime = date("Ymd");

		$sql = "SELECT ticket_value +1 FROM track_ticketids where ticket_id='6'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {


				if($data[0] > 997){


						$sql = "UPDATE track_ticketids SET ticket_value = 0 WHERE ticket_id='6'";
						mysqli_query($con, $sql);

				}


			 $num_padded = sprintf("%04d", $data[0]);
			 $organisation = 'UTIL - '.$datetime.' - '.$num_padded;

				echo $organisation;

		}




}// selectcompanyIdphp






 function enternewutilsphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$assetticket = mysqli_real_escape_string($con, $_POST['assetticket']);
		$assetclass = mysqli_real_escape_string($con, $_POST['assetclass']);
		$assetname = mysqli_real_escape_string($con, $_POST['assetname']);
		$assetdescrip = mysqli_real_escape_string($con, $_POST['assetdescrip']);
		$assetmodelno = mysqli_real_escape_string($con, $_POST['assetmodelno']);
		$assetserialno = mysqli_real_escape_string($con, $_POST['assetserialno']);
		$assetlabelno = mysqli_real_escape_string($con, $_POST['assetlabelno']);
		$assetstatus = mysqli_real_escape_string($con, $_POST['assetstatus']);
		$assetorg = mysqli_real_escape_string($con, $_POST['assetorg']);
		$assetstore = mysqli_real_escape_string($con, $_POST['assetstore']);
		$assetcreatedby = mysqli_real_escape_string($con, $_POST['assetcreatedby']);




		$sql = "INSERT INTO tracking_utils (util_orgarnisation,util_class,util_name,util_description,util_modelno,
		util_labelno,util_serialno,util_status,util_store,util_createdby,util_datecreated,util_ticketno) VALUES
		('$assetorg','$assetclass','$assetname','$assetdescrip','$assetmodelno','$assetlabelno','$assetserialno','$assetstatus','$assetstore','$assetcreatedby'
	     ,'$currdate','$assetticket')";



		if((mysqli_query($con,$sql))){


			$sql = "UPDATE track_ticketids SET ticket_value = ticket_value + 1 WHERE ticket_id='6'";
			mysqli_query($con, $sql);

			echo "success";

		} else {

			// echo (mysqli_query($con,$sql));

			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp







function listallutilentriesphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);
		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);


		$sql = "SELECT util_name,util_ticketno,util_datecreated,util_dateout,util_datein,util_out,util_in,util_id,util_dispatcher  FROM
		 tracking_utils WHERE util_orgarnisation LIKE '$company_id%' AND  util_store LIKE '$store_id%'
		 GROUP BY util_id";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {


			while($data = mysqli_fetch_row($result)) {




				 $trackass_name =$data[0];
				 $trackass_name = (strlen($trackass_name) > 15) ? substr($trackass_name,0,15).'...' : $trackass_name;
				 $trackass_name =ucwords($trackass_name);


				 $trackass_no =$data[1];
				 $trackass_no = (strlen($trackass_no) > 15) ? substr($trackass_no,0,15).'...' : $trackass_no;
				 $trackass_no =ucwords($trackass_no);


				$trackass_created =$data[2];
				$trackass_created =date('d/m/Y',strtotime($trackass_created));


				$trackass_datesent = '';
				$trackass_datercvd ='';




				if ($data[3] < $data[2]) {

					    $trackass_datesent = "---";

					   }

					  else {

						$trackass_datesent =$data[3];
						$trackass_datesent =date('d/m/Y',strtotime($trackass_datesent));

					  }



					  if ($data[4] <= $data[3]) {

					    $trackass_datercvd = "---";

					   }

					  else {

						$trackass_datercvd =$data[3];
						$trackass_datercvd =date('d/m/Y',strtotime($trackass_datercvd));


					  }







				$trackass_sent =$data[5];


				 if ($trackass_sent=='Y') {

					    $trackass_sent = "<input type='checkbox'  value='$data[7]' checked disabled>";

					   }

				  else {

					$trackass_sent = "<input type='checkbox'  value='$data[7]'>";

				  }



					$trackass_rcvd =$data[6];

				  if ($trackass_rcvd=='Y') {

					    $trackass_rcvd = "<input type='checkbox'  value='$data[7]' checked disabled>";

					   }

				  else {

					$trackass_rcvd = "<input type='checkbox'  value='$data[7]'>";

				  }


				 $trackass_dispatcher =$data[8];

				 if ($trackass_dispatcher=='') {

					    $trackass_dispatcher = "---";

					   }

				  else {

				$trackass_dispatcher = (strlen($trackass_dispatcher) > 10) ? substr($trackass_dispatcher,0,10).'...' : $trackass_dispatcher;
				 $trackass_dispatcher =ucwords($trackass_dispatcher);

				  }


				 $trackass_id =$data[7];



						$output .= "
        			    <tr>
                          <td>$trackass_name</td>
                          <td>$trackass_no</td>
                          <td>$trackass_created</td>
                          <td>$trackass_datesent</td>
                          <td>$trackass_datercvd</td>
                          <td>$trackass_dispatcher</td>
                          <td>$trackass_sent</td>
                          <td>$trackass_rcvd</td>
                          <td><span class='list-buttons' >
                          <span class='create-ticket' data-toggle='modal' data-target='#edittoolModal' onclick='javascript:getEditUtil(\"$trackass_id\");'>
                          Edit</span></span></td>
                        </tr>
						";



						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp





 function checkoutUtilphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$editid = mysqli_real_escape_string($con, $_POST['editid']);
		$dispatcherid = mysqli_real_escape_string($con, $_POST['dispatcherid']);
		$created_by = mysqli_real_escape_string($con, $_POST['created_by']);



		$sql = "UPDATE tracking_utils SET util_out = 'Y',util_in = 'N',util_dispatcher = '$dispatcherid',util_createdby = '$created_by',
		util_dateout = '$currdate' WHERE util_id='$editid'";

		if((mysqli_query($con,$sql))){


			echo "success";

		} else {


			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp





 function checkInUtilphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$editid = mysqli_real_escape_string($con, $_POST['editid']);
		$created_by = mysqli_real_escape_string($con, $_POST['created_by']);



		$sql = "UPDATE tracking_utils SET util_out = 'N',util_in = 'Y',util_createdby = '$created_by',
		util_datein = '$currdate' WHERE util_id='$editid'";

		if((mysqli_query($con,$sql))){


			// $sql = "UPDATE tracking_assets set trackass_sent='N',trackass_createdby='$created_by',trackass_storeno='$store_id' where
			// trackass_ticketno = (select sentitems_ticketno from tracking_sentitems where sentitems_id = '$editid')";
			// mysqli_query($con, $sql);

			echo "success";

		} else {


			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp






function selectUserIDphp(){

		global $con;
		global $currdate;
		global $passwd_salt;



		$datetime = date("Ymd");

		$sql = "SELECT ticket_value +1 FROM track_ticketids where ticket_id='7'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {


				if($data[0] > 997){


						$sql = "UPDATE track_ticketids SET ticket_value = 0 WHERE ticket_id='7'";
						mysqli_query($con, $sql);

				}


			 $num_padded = sprintf("%04d", $data[0]);
			 $organisation = 'USR'.$datetime.''.$num_padded;

				echo $organisation;

		}




}// selectcompanyIdphp







 function enternewusersphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$user_name = mysqli_real_escape_string($con, $_POST['user_name']);
		$user_firstname = mysqli_real_escape_string($con, $_POST['user_firstname']);
		$user_lastname = mysqli_real_escape_string($con, $_POST['user_lastname']);
		$user_organisation = mysqli_real_escape_string($con, $_POST['user_organisation']);
		$user_store = mysqli_real_escape_string($con, $_POST['user_store']);
		$user_email = mysqli_real_escape_string($con, $_POST['user_email']);
		$user_phone = mysqli_real_escape_string($con, $_POST['user_phone']);
		$user_level = mysqli_real_escape_string($con, $_POST['user_level']);
		$user_passwd = mysqli_real_escape_string($con, $_POST['user_passwd']);
		$salted_passwd = $user_passwd.$passwd_salt;
		$aplus = "+";


				if( strpos( $user_phone, $aplus ) == false ) {
				
					$user_phone= $aplus.$user_phone;

				}


				$sql = "SELECT user_firstname FROM tracking_users WHERE user_code='$user_name'";
				$result = mysqli_query($con, $sql);

				if (mysqli_num_rows($result)>0) {

					//Check if country exists
					echo "exists";
			
				} else {


				$sql = "INSERT INTO tracking_users (user_firstname,user_lastname,user_organisation,user_store,
				user_email,user_phone,user_code,user_password,user_level,user_created) VALUES
				('$user_firstname','$user_lastname','$user_organisation','$user_store','$user_email','$user_phone',
				'$user_name',SHA1('$salted_passwd'),'$user_level','$currdate')";



					if((mysqli_query($con,$sql))){

						$sql = "UPDATE track_ticketids SET ticket_value = ticket_value + 1 WHERE ticket_id='7'";
						mysqli_query($con, $sql);
						echo "success";

					} else {

						// echo (mysqli_query($con,$sql));

						echo "failed";

					}


				}
			mysqli_close($con);



}// submit_companydetailsphp







function listallusersphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);
		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);

		// $sql = "SELECT CONCAT(user_firstname,' ',user_lastname),user_organisation,user_level,user_phone,
		// user_inactive,user_loggedin,user_id  FROM tracking_users WHERE user_store LIKE '$store_id%'";

$sql = "SELECT CONCAT(T1.user_firstname,' ',T1.user_lastname) as user_name,
T1.user_level as user_level,T1.user_phone as user_phone,
T1.user_inactive as user_inactive,T1.user_loggedin as user_loggedin,T1.user_id as user_id,
T2.company_name as company_name, T3.store_name as store_name FROM tracking_users T1
INNER JOIN tracking_companies T2 ON T1.user_organisation = T2.company_id
INNER JOIN tracking_stores T3 ON T1.user_store  = T3.store_id WHERE T1.user_store LIKE '$store_id%'
AND T1.user_organisation LIKE '$company_id%' GROUP BY T1.user_id";


		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {


			while($data = mysqli_fetch_row($result)) {




				 $user_name =$data[0];
				 $user_name = (strlen($user_name) > 20) ? substr($user_name,0,20).'...' : $user_name;
				 $user_name =ucwords($user_name);


				 $user_level =$data[1];

				 if ($user_level=='0') {

					$user_level = 'Normal';

				 } elseif ($user_level=='1')  {

					$user_level = 'Store Manager';

				 } elseif ($user_level=='2')  {

					$user_level = 'Technician';

				 } elseif ($user_level=='3')  {

					$user_level = 'Company';
					
				 } elseif ($user_level=='4')  {

					$user_level = 'Root';
				}

				 
				$user_phone =$data[2];


				$user_active =$data[3];


				if ($user_active=='Y') {

					   $user_active = "<input type='checkbox'  value='$data[5]' checked>";

					  }

					 else {

				   $user_active = "<input type='checkbox'  value='$data[5]'>";

				 }


				 $user_loggedin =$data[4];


				 if ($user_loggedin=='Y') {

					    $user_loggedin = "<span class='fa fa-check'></span>";

					   }

				  	else {

					$user_loggedin = "<span class='fa fa-close'></span>";

				  }


				  
				 $user_id =$data[5];

				 $company_name =$data[6];
				 $company_name = (strlen($company_name) > 20) ? substr($company_name,0,20).'...' : $company_name;
				 $company_name =ucwords($company_name);


				 $user_store =$data[7];
				 $user_store = (strlen($user_store) > 20) ? substr($user_store,0,20).'...' : $user_store;
				 $user_store =ucwords($user_store);


				 


						$output .= "
        			    <tr>
                          <td>$user_name</td>
                          <td>$company_name</td>
						  <td>$user_store</td>
						  <td>$user_level</td>
						  <td>$user_phone</td>
						  <td>$user_active</td>                          
                          <td>$user_loggedin</td>
                          <td><span class='list-buttons' >
                          <span class='create-ticket'data-toggle='modal' data-target='#editUserModal' onclick='javascript:getEditUser(\"$user_id\");'>
                          Edit</span>&nbsp;&nbsp;
                          <span class='create-ticket' data-toggle='modal' data-target='#resetModal' onclick='javascript:getEditUser(\"$user_id\");'>
                          Reset</span></span></td>
                        </tr>
						";



						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp





function selectToolDetailsphp(){

	   global $con;
	   global $company_session;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



		$sql = "SELECT $selectcol FROM tracking_tools where tools_id='$asset_id'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}





 function updatenewtoolsphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$assetid = mysqli_real_escape_string($con, $_POST['assetid']);
		$assetclass = mysqli_real_escape_string($con, $_POST['assetclass']);
		$assetname = mysqli_real_escape_string($con, $_POST['assetname']);
		$assetdescrip = mysqli_real_escape_string($con, $_POST['assetdescrip']);
		$assetmodelno = mysqli_real_escape_string($con, $_POST['assetmodelno']);
		$assetserialno = mysqli_real_escape_string($con, $_POST['assetserialno']);
		$assetlabelno = mysqli_real_escape_string($con, $_POST['assetlabelno']);
		$assetstatus = mysqli_real_escape_string($con, $_POST['assetstatus']);



	 	$sql = "UPDATE tracking_tools SET tools_class= '$assetclass',tools_name = '$assetname',tools_descrip = '$assetdescrip'
		,tools_modelno = '$assetmodelno',tools_labelno = '$assetlabelno',tools_serialno = '$assetserialno' WHERE tools_id='$assetid'";


		if((mysqli_query($con,$sql))){


			echo "success";

		} else {

			// echo (mysqli_query($con,$sql));

			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp






function selectRcvDetailsphp(){

	   global $con;
	   global $company_session;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



		$sql = "SELECT $selectcol FROM tracking_sentitems where sentitems_id='$asset_id'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}





function selectUtilDetailsphp(){

	   global $con;
	   global $company_session;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



		$sql = "SELECT $selectcol FROM tracking_utils where util_id='$asset_id'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}





 function updatenewutilsphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$assetid = mysqli_real_escape_string($con, $_POST['assetid']);
		$assetclass = mysqli_real_escape_string($con, $_POST['assetclass']);
		$assetname = mysqli_real_escape_string($con, $_POST['assetname']);
		$assetdescrip = mysqli_real_escape_string($con, $_POST['assetdescrip']);
		$assetmodelno = mysqli_real_escape_string($con, $_POST['assetmodelno']);
		$assetserialno = mysqli_real_escape_string($con, $_POST['assetserialno']);
		$assetlabelno = mysqli_real_escape_string($con, $_POST['assetlabelno']);
		$assetstatus = mysqli_real_escape_string($con, $_POST['assetstatus']);



	 	$sql = "UPDATE tracking_utils SET util_class= '$assetclass',util_name = '$assetname',util_description = '$assetdescrip'
		,util_modelno = '$assetmodelno',util_labelno = '$assetlabelno',util_serialno = '$assetserialno' WHERE util_id='$assetid'";


		if((mysqli_query($con,$sql))){


			echo "success";

		} else {

			// echo (mysqli_query($con,$sql));

			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp



function selectUserDetailsphp(){

	   global $con;
	   global $company_session;


		$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
		$asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



		$sql = "SELECT $selectcol FROM tracking_users where user_id='$asset_id'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}






function selectUserNamesphp(){

	   global $con;
	   global $company_session;



		$asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



		$sql = "SELECT CONCAT(user_firstname,' ',user_middlename,' ',user_lastname) FROM tracking_users where user_id='$asset_id'";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}





 function editnewusersphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$assetid = mysqli_real_escape_string($con, $_POST['asset_id']);
		$edituser_firstname = mysqli_real_escape_string($con, $_POST['edituser_firstname']);
		$edituser_lastname = mysqli_real_escape_string($con, $_POST['edituser_lastname']);
		$edituser_organisation = mysqli_real_escape_string($con, $_POST['edituser_organisation']);
		$edituser_store = mysqli_real_escape_string($con, $_POST['edituser_store']);
		$edituser_email = mysqli_real_escape_string($con, $_POST['edituser_email']);
		$edituser_phone = mysqli_real_escape_string($con, $_POST['edituser_phone']);
		$edituser_level = mysqli_real_escape_string($con, $_POST['edituser_level']);
		$aplus = "+";


		if( strpos( $edituser_phone, $aplus ) == false ) {
		
			$edituser_phone= $aplus.$edituser_phone;

		}




	 	$sql = "UPDATE tracking_users SET user_firstname= '$edituser_firstname',
		 user_lastname = '$edituser_lastname',user_organisation = '$edituser_organisation'
		,user_store = '$edituser_store',user_email = '$edituser_email',user_phone = '$edituser_phone'
		,user_level = '$edituser_level'
		WHERE user_id='$assetid'";



		if((mysqli_query($con,$sql))){


			echo "success";

		} else {

			// echo (mysqli_query($con,$sql));

			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp






 function resetsuserPasswordphp(){

		global $con;
		global $currdate;
		global $passwd_salt;


		$assetid = mysqli_real_escape_string($con, $_POST['asset_id']);
		$user_passwd = '12345';
		$salted_passwd = $user_passwd.$passwd_salt;




	 	$sql = "UPDATE tracking_users SET user_password= SHA1('$salted_passwd') WHERE user_id='$assetid'";



		if((mysqli_query($con,$sql))){


			echo "success";

		} else {

			// echo (mysqli_query($con,$sql));

			echo "failed";

		}



			mysqli_close($con);



}// submit_companydetailsphp




function countTicketphp(){

	   global $con;
	   global $company_session;



		$store_id= mysqli_real_escape_string($con, $_POST['store_id']);



		$sql = "SELECT COUNT(incident_ticketno) FROM tracking_incidences";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}



function countAssetphp(){

	   global $con;
	   global $company_session;



		$store_id= mysqli_real_escape_string($con, $_POST['store_id']);



		$sql = "SELECT COUNT(trackass_ticketno) FROM tracking_assets";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}






function countSolutionphp(){

	   global $con;
	   global $company_session;



		$store_id= mysqli_real_escape_string($con, $_POST['store_id']);



		$sql = "SELECT COUNT(solution_id) FROM tracking_solutions";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}




}




function countUsersphp(){

	   global $con;
	   global $company_session;   		



		$sql = "SELECT COUNT(user_firstname) FROM tracking_users";
		$result = mysqli_query($con, $sql);


		while($data = mysqli_fetch_array($result)) {
			 $organisation = $data[0];
				 echo $organisation;
		}



}




function countReqsphp(){

	global $con;
	global $company_session;   		



	 $sql = "SELECT COUNT(request_ticketno) FROM tracking_requests";
	 $result = mysqli_query($con, $sql);


	 while($data = mysqli_fetch_array($result)) {
		  $organisation = $data[0];
			  echo $organisation;
	 }




}







function listdashboardincphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);


		$sql = "SELECT incident_subject,incident_priority,incident_status  FROM
		 tracking_incidences WHERE incident_cancelled='N' GROUP BY incident_id order by incident_id desc LIMIT 0,10";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {



					while($data = mysqli_fetch_row($result)) {


				 $incident_subject =$data[0];
				 $incident_subject = (strlen($incident_subject) > 30) ? substr($incident_subject,0,30).'...' : $incident_subject;
				 $incident_subject =ucfirst($incident_subject);
				 $incident_subject = "<label class='lead lead-tickets-row'>$incident_subject</label>&nbsp;&nbsp";



				 $incident_priority =$data[1];


				 	  if ($incident_priority=='Low') {

					    $incident_priority = "<label class=''><span class='label label-normal'><small>Low</small></span></label>";

					   }

					  else if ($incident_priority=='Normal') {

						$incident_priority = "<label class=''><span class='label label-success'><small>Normal</small></span></label>";

					  }

					  else if ($incident_priority=='High') {

						$incident_priority = "<label class=''><span class='label label-warning'><small>High</small></span></label>";

					  }

					  else if ($incident_priority=='Urgent') {

						$incident_priority = "<label class=''><span class='label label-danger'><small>Urgent</small></span></label>";

					  }





					  $incident_status =$data[2];


				 	  if ($incident_status=='open') {

					    $incident_status = "<label class='lead lead-tickets-status'>Open</label>";

					   }

					  else if ($incident_status=='received') {

						$incident_status = "<label class='lead lead-tickets-status'>Pending</label>";

					  }

					  else if ($incident_status=='closed') {

						$incident_status = "<label class='lead lead-tickets-status'>Pending</label>";

					  }




						$output .= "
						<div class='row panel-tickets-row'>
                          <div class='col-md-10'>
                            $incident_subject
                            $incident_priority
                          </div>
                          <div class='col-md-2'>
                            $incident_status
                          </div>
                        </div>
						";


						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp








function listdashboardassetsphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);


		$sql = "SELECT trackass_name,trackass_class  FROM
		 tracking_assets GROUP BY trackass_id order by trackass_id desc LIMIT 0,5";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {



					while($data = mysqli_fetch_row($result)) {


				 $trackass_name =$data[0];
				 $trackass_name = (strlen($trackass_name) > 25) ? substr($trackass_name,0,25).'...' : $trackass_name;
				 $trackass_name =ucwords($trackass_name);



				 $trackass_class =$data[1];
				 $trackass_class = (strlen($trackass_class) > 10) ? substr($trackass_class,0,10).'...' : $trackass_class;
				 $trackass_class =ucwords($trackass_class);



						$output .= "
						<div class='row panel-tickets-row'>
                          <div class='col-md-9'>
                            <label class='lead lead-tickets-row'>$trackass_name</label>
                          </div>
                          <div class='col-md-3'>
                            <label class='lead lead-tickets-row-asset'>$trackass_class</label>
                          </div>
                        </div>
                        ";


						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp







function listdashboardsolutionphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$company_id = mysqli_real_escape_string($con, $_POST['company_id']);


		$sql = "SELECT solution_title,solution_content  FROM
		 tracking_solutions GROUP BY solution_id order by solution_id desc LIMIT 0,5";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {



					while($data = mysqli_fetch_row($result)) {


				 $solution_title =$data[0];
				 $solution_title = (strlen($solution_title) > 20) ? substr($solution_title,0,20).'...' : $solution_title;
				 $solution_title =ucwords($solution_title);



				 $solution_content =$data[1];
				 $solution_content = (strlen($solution_content) > 60) ? substr($solution_content,0,60).'...' : $solution_content;
				 $solution_content =ucfirst($solution_content);



						$output .= "
                        <div class='row panel-solution-row'>
                          <div class='col-md-12'>
                            <label class='lead lead-tickets-row-asset'>$solution_title</label><br/>
                            <label class='lead lead-tickets-row'>$solution_content</label>
                          </div>
                        </div>
                        ";


						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp







function listdashboardusersphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);



		$sql = "SELECT CONCAT(T1.user_firstname,' ',T1.user_lastname) as user_name,
		T1.user_level as user_level,T1.user_phone as user_phone,
		T1.user_inactive as user_inactive,T1.user_loggedin as user_loggedin,T1.user_id as user_id,
		T1.user_lastvisit as user_lastvisit,T2.company_name as company_name, T3.store_name as store_name FROM tracking_users T1
		INNER JOIN tracking_companies T2 ON T1.user_organisation = T2.company_id
		INNER JOIN tracking_stores T3 ON T1.user_store  = T3.store_id
		 GROUP BY T1.user_id ORDER BY T1.user_lastvisit LIMIT 0,10";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {


			while($data = mysqli_fetch_row($result)) {

				 $user_name =$data[0];
				 $user_name = (strlen($user_name) > 25) ? substr($user_name,0,25).'...' : $user_name;
				 $user_name =ucwords($user_name);

				 $company_name =$data[7];
				 $company_name = (strlen($company_name) > 20) ? substr($company_name,0,20).'...' : $company_name;
				 $company_name =ucwords($company_name);


				 $user_store =$data[8];
				 $user_store = (strlen($user_store) > 20) ? substr($user_store,0,20).'...' : $user_store;
				 $user_store =ucwords($user_store);

				 $user_phone =$data[2];


				 $user_active =$data[3];


				if ($user_active=='Y') {

					   $user_active = "<input type='checkbox'  value='$data[5]' checked>";

					  }

					 else {

				   $user_active = "<input type='checkbox'  value='$data[5]'>";

				 }


				 $user_loggedin =$data[4];


				 if ($user_loggedin=='Y') {

					    $user_loggedin = "<span class='fa fa-check'></span>";

					   }

				  	else {

					$user_loggedin = "<span class='fa fa-close'></span>";

				  }


				 

						$output .= "
        			    <tr>
                          <td>$user_name</td>
                          <td>$company_name</td>
                          <td>$user_store</td>
                          <td>$user_phone</td>
                          <td>$user_active</td>
                          <td>$user_loggedin</td>
                        </tr>
						";



						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp




function fillnewsolClassphp(){
 //--
		global $con;
		global $currdate;
		global $passwd_salt;



		$sql = "SELECT class_name FROM tracking_assetclass";
		$result = mysqli_query($con, $sql);


// echo $result;

		  	echo "<select class='form-control' id='solution_class'>";


		while($data = mysqli_fetch_row($result)) {

			$ass_class =$data[0];
			$ass_class = ucwords($ass_class);

			echo "<option value='$ass_class'>$ass_class</option>";

		}


		  	echo "<option selected='selected'>$ass_class</option>";
		  	echo "</select>";



}// selectcompanyIdphp



function addnewSolutionphp(){

   global $con;
   global $currdate;
   global $passwd_salt;


   $solutionclass = mysqli_real_escape_string($con, $_POST['solutionclass']);
   $solutionitemname = mysqli_real_escape_string($con, $_POST['solutionitemname']);
   $solutiontitle = mysqli_real_escape_string($con, $_POST['solutiontitle']);
   $solutiondetails = mysqli_real_escape_string($con, $_POST['solutiondetails']);




   $sql = "INSERT INTO tracking_solutions (solution_topic,solution_subtopic,solution_title,solution_content,solution_date) VALUES
   ('$solutionclass','$solutionitemname','$solutiontitle','$solutiondetails','$currdate')";



   if((mysqli_query($con,$sql))){

     echo "success";

   } else {

     echo "failed";

   }



     mysqli_close($con);



}// submit_companydetailsphp





function listallsolutionssentriesphp(){

		global $con;
		global $currdate;
		global $passwd_salt;
		$output = '';


		$store_id = mysqli_real_escape_string($con, $_POST['store_id']);


		$sql = "SELECT solution_topic,solution_subtopic,solution_title,solution_content,solution_deactivated,
		solution_id,solution_date,solution_hidden FROM
		 tracking_solutions WHERE solution_deactivated='N'";



		$result = mysqli_query($con, $sql);


		if (mysqli_num_rows($result)>0) {


			while($data = mysqli_fetch_row($result)) {



				 $solution_class =$data[0];
				 $solution_class = (strlen($solution_class) > 25) ? substr($solution_class,0,25).'...' : $solution_class;
				 $solution_class =ucwords($solution_class);



				 $solution_name =$data[1];
				 $solution_name = (strlen($solution_name) > 25) ? substr($solution_name,0,25).'...' : $solution_name;
				 $solution_name =ucwords($solution_name);



				 $solution_title =$data[2];
				 $solution_title = (strlen($solution_title) > 45) ? substr($solution_title,0,45).'...' : $solution_title;
				 $solution_title =ucwords($solution_title);


         $solution_date =$data[6];
         $solution_date =date('d/m/Y',strtotime($solution_date));


				$solution_hidden =$data[7];


				 if ($solution_hidden=='Y') {

					    $solution_hidden = "<input type='checkbox'  value='$data[5]' checked>";

					   }

					  else {

						$solution_hidden = "<input type='checkbox'  value='$data[5]'>";

					  }



				$solution_id =$data[5];





						$output .= "
        			    <tr>
                          <td>$solution_class</td>
                          <td>$solution_name</td>
                          <td>$solution_title</td>
                          <td>$solution_date</td>
                          <td>$solution_hidden</td>
                          <td><span class='list-buttons' >
                          <span class='create-ticket' data-toggle='modal' data-target='#editSoluModal' onclick='javascript:getEditSolution(\"$solution_id\");'>
                          Edit</span>&nbsp;&nbsp;
                          <span class='create-ticket' data-toggle='modal' data-target='#delSoluModal' onclick='javascript:getDelSolution(\"$solution_id\");'>
                          Delete</span>&nbsp;&nbsp;
                          <span class='create-ticket' data-toggle='modal' data-target='#viewSoluModal' onclick='javascript:getViewSolution(\"$solution_id\");'>
                          View</span></span></td>
                        </tr>
						";



						}

						echo $output;


		}




			mysqli_close($con);



}  // getallCompanyphp




function hidesolutionphp(){

	global $con;
	global $currdate;
	global $passwd_salt;



	$row_id= mysqli_real_escape_string($con, $_POST['rowid']);
	$status= mysqli_real_escape_string($con, $_POST['status']);


	$sql = "UPDATE tracking_solutions SET solution_hidden = '$status' WHERE solution_id='$row_id'";

	if((mysqli_query($con,$sql))){

		echo "success";


	} else {

		echo "failed";

	}





}





function selectSolutiontDetailsphp(){

	global $con;
	global $company_session;


	 $selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
	 $request_id= mysqli_real_escape_string($con, $_POST['request_id']);



	 $sql = "SELECT $selectcol FROM tracking_solutions where solution_id='$request_id'";
	 $result = mysqli_query($con, $sql);


	 while($data = mysqli_fetch_array($result)) {
		  $organisation = $data[0];
			  echo $organisation;
	 }




}




function selectSolutiontContentphp(){

	global $con;
	global $company_session;


	 $selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
	 $request_id= mysqli_real_escape_string($con, $_POST['request_id']);



	 $sql = "SELECT $selectcol FROM tracking_solutions where solution_id='$request_id'";
	 $result = mysqli_query($con, $sql);


	 while($data = mysqli_fetch_array($result)) {
		  $organisation = $data[0];
		  $organisation = strip_tags($organisation);
			  echo $organisation;
	 }




}





function editnewSolutionphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
 
 
	$solutionclass = mysqli_real_escape_string($con, $_POST['solutionclass']);
	$solutionitemname = mysqli_real_escape_string($con, $_POST['solutionitemname']);
	$solutiontitle = mysqli_real_escape_string($con, $_POST['solutiontitle']);
	$solutiondetails = mysqli_real_escape_string($con, $_POST['solutiondetails']);
	$request_id = mysqli_real_escape_string($con, $_POST['request_id']);
 
 
 
	$sql = "UPDATE tracking_solutions SET solution_topic = '$solutionclass',
	solution_subtopic = '$solutionitemname',
	solution_title = '$solutiontitle',solution_content = '$solutiondetails' WHERE solution_id='$request_id'";
 
 
 
	if((mysqli_query($con,$sql))){
 
	  echo "success";
 
	} else {
 
	  echo "failed";
 
	}
 
 
 
	  mysqli_close($con);
 
 
 
 }// submit_companydetailsphp




 
function delSolutionphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
 
 
	$request_id = mysqli_real_escape_string($con, $_POST['request_id']);  
	
	$sql = "UPDATE tracking_solutions SET solution_deactivated = 'Y' WHERE solution_id='$request_id'"; 
 
 
	if((mysqli_query($con,$sql))){
 
	  echo "success";
 
	} else {
 
	  echo "failed";
 
	}
 
 
 
	  mysqli_close($con);
 
 
 
 }// submit_companydetailsphp
 
 


 function selectCountryIdphp(){

	global $con;
	global $currdate;
	global $passwd_salt;



	$datetime = date("Ymd");

	$sql = "SELECT ticket_value +1 FROM track_ticketids where ticket_id='8'";
	$result = mysqli_query($con, $sql);


	while($data = mysqli_fetch_array($result)) {


			if($data[0] > 997){


					$sql = "UPDATE track_ticketids SET ticket_value = 0 WHERE ticket_id='8'";
					mysqli_query($con, $sql);

			}


		 $num_padded = sprintf("%04d", $data[0]);
		 $organisation = 'COU - '.$datetime.' - '.$num_padded;

			echo $organisation;

	}




}// selectcompanyIdphp






function enternewcountryphp(){

	global $con;
	global $currdate;
	global $passwd_salt;


	$country_id = mysqli_real_escape_string($con, $_POST['country_id']);
	$country_name = mysqli_real_escape_string($con, $_POST['country_name']);
	$country_code = mysqli_real_escape_string($con, $_POST['country_code']);
	$aplus = "+";


				if( strpos( $country_code, $aplus ) == false ) {
				
					$country_code= $aplus.$country_code;

				}


	$sql = "SELECT country_name FROM track_countries WHERE country_name='$country_name'";
	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {

		//Check if country exists
		echo "exists";

	} else {


		$sql = "INSERT INTO track_countries (country_no,country_name,country_code,country_datecreated) VALUES
		('$country_id','$country_name','$country_code','$currdate')";
	
	
	
		if((mysqli_query($con,$sql))){
	
			$sql = "UPDATE track_ticketids SET ticket_value = ticket_value + 1 WHERE ticket_id='8'";
			mysqli_query($con, $sql);
			echo "success";
	
		} else {
	
			// echo (mysqli_query($con,$sql));
	
			echo "failed";
	
		}

	

	} //Check if country exists





		mysqli_close($con);



}// submit_companydetailsphp





function listallcountriesphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';


	

	$sql = "SELECT country_name,country_code,country_id,country_deactivated FROM track_countries";



	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {




			 $country_name =$data[0];
			 $country_name =ucwords($country_name);

			 $country_code =$data[1];

		
			 $country_deactivated =$data[3];



			 if ($country_deactivated=='Y') {

				$country_deactivated = "<input type='checkbox'  value='$data[2]' checked>";

				   }

				  else {

					$country_deactivated = "<input type='checkbox'  value='$data[2]'>";

			  }

			 $country_id =$data[2];




					$output .= "
					<tr>
					  <td>$country_name</td>
					  <td>$country_code</td>
					  <td>$country_deactivated</td>
					  <td><span class='list-buttons' >
					  <span class='create-ticket'data-toggle='modal' data-target='#editCountryModal' onclick='javascript:getEditCountry(\"$country_id\");'>
					  Edit</span></td>
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp



function selectCountryDetailsphp(){

	global $con;
	global $company_session;


	 $selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
	 $asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



	 $sql = "SELECT $selectcol FROM track_countries where country_id='$asset_id'";
	 $result = mysqli_query($con, $sql);


	 while($data = mysqli_fetch_array($result)) {
		  $organisation = $data[0];
			  echo $organisation;
	 }




}





function editcountriesphp(){

	global $con;
	global $currdate;
	global $passwd_salt;


	$assetid = mysqli_real_escape_string($con, $_POST['asset_id']);
	$editcountry_name = mysqli_real_escape_string($con, $_POST['editcountry_name']);
	$editcountry_code = mysqli_real_escape_string($con, $_POST['editcountry_code']);
	$aplus = "+";


				if( strpos( $editcountry_code, $aplus ) == false ) {
				
					$editcountry_code= $aplus.$editcountry_code;

				}



	 $sql = "UPDATE track_countries SET country_name= '$editcountry_name',country_code = '$editcountry_code'
	  WHERE country_id='$assetid'";



	if((mysqli_query($con,$sql))){


		echo "success";

	} else {

		// echo (mysqli_query($con,$sql));

		echo "failed";

	}



		mysqli_close($con);



}// submit_companydetailsphp





function selectCompanyIDphp(){

	global $con;
	global $currdate;
	global $passwd_salt;



	$datetime = date("Ymd");

	$sql = "SELECT ticket_value +1 FROM track_ticketids where ticket_id='9'";
	$result = mysqli_query($con, $sql);


	while($data = mysqli_fetch_array($result)) {


			if($data[0] > 997){


					$sql = "UPDATE track_ticketids SET ticket_value = 0 WHERE ticket_id='9'";
					mysqli_query($con, $sql);

			}


		 $num_padded = sprintf("%04d", $data[0]);
		 $organisation = 'COM - '.$datetime.' - '.$num_padded;

			echo $organisation;

	}




}// selectcompanyIdphp




function enternewcompanyphp(){

	global $con;
	global $currdate;
	global $passwd_salt;


	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
	$company_name = mysqli_real_escape_string($con, $_POST['company_name']);
	$company_country = mysqli_real_escape_string($con, $_POST['company_country']);
	$company_phone = mysqli_real_escape_string($con, $_POST['company_phone']);
	$company_email = mysqli_real_escape_string($con, $_POST['company_email']);
	$company_website = mysqli_real_escape_string($con, $_POST['company_website']);
	$company_address = mysqli_real_escape_string($con, $_POST['company_address']);
	$company_city = mysqli_real_escape_string($con, $_POST['company_city']);
	$aplus = "+";


	if( strpos( $company_phone, $aplus ) == false ) {
	
		$company_phone= $aplus.$company_phone;

	}



	$sql = "SELECT company_name FROM tracking_companies WHERE company_name='$company_name'";
	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {

		//Check if country exists
		echo "exists";

	} else {


		$sql = "INSERT INTO tracking_companies (company_no,company_name,company_country,
		company_phone,company_email,company_website,company_address,company_town,company_datecreated) VALUES
		('$company_id','$company_name','$company_country','$company_phone','$company_email'
		,'$company_website','$company_address','$company_city','$currdate')";
	
	
	
		if((mysqli_query($con,$sql))){
	
			$sql = "UPDATE track_ticketids SET ticket_value = ticket_value + 1 WHERE ticket_id='9'";
			mysqli_query($con, $sql);
			echo "success";
	
		} else {
	
			// echo (mysqli_query($con,$sql));
	
			echo "failed";
	
		}

	

	} //Check if country exists





		mysqli_close($con);



}// submit_companydetailsphp





function fillcountrycompanyphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT country_name,country_id FROM track_countries";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='company_country'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $country_name =$data[0];
			   $country_name = ucwords($country_name);
   
			   $country_id =$data[1];
   
			   echo "<option value='$country_id'>$country_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$country_id'>$country_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp
   
   


   

function listallcompaniesphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';


	

	$sql = "SELECT company_name,company_website,company_currusers,company_deactivated,company_id,country_name FROM
		 tracking_companies T1 left join track_countries T2 ON T1.company_country=T2.country_id";



	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {




			 $company_name =$data[0];
			 $company_name =ucwords($company_name);

			 $company_website =$data[1];
			 $company_website =strtolower($company_website);

		
			 $company_currusers=$data[2];

			 $company_deactivated=$data[3];

			 if ($company_deactivated=='Y') {

				$company_deactivated = "<input type='checkbox'  value='$data[4]' checked>";

				   }

				  else {

					$company_deactivated = "<input type='checkbox'  value='$data[4]'>";

			  }

			 $company_id =$data[4];


			 $country_name =$data[5];
			 $country_name =ucwords($country_name);




					$output .= "
					<tr>
					  <td>$company_name </td>
					  <td>$country_name</td>
					  <td>$company_website</td>
					  <td>$company_currusers</td>
					  <td>$company_deactivated</td>
					  <td><span class='list-buttons' >
					  <span class='create-ticket'data-toggle='modal' data-target='#editCompanyModal' onclick='javascript:getEditCompany(\"$company_id\");'>
					  Edit</span></td>
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp



function selectCompanyDetailsphp(){

	global $con;
	global $company_session;


	 $selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
	 $asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



	 $sql = "SELECT $selectcol FROM tracking_companies where company_id='$asset_id'";
	 $result = mysqli_query($con, $sql);


	 while($data = mysqli_fetch_array($result)) {
		  $organisation = $data[0];
			  echo $organisation;
	 }




}



function filleditcountrycompanyphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT country_name,country_id FROM track_countries";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='editcompany_country'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $country_name =$data[0];
			   $country_name = ucwords($country_name);
   
			   $country_id =$data[1];
   
			   echo "<option value='$country_id'>$country_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$country_id'>$country_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp
   
  
   
   function selectCountryDetailsIDphp(){

	global $con;
	global $company_session;


	 $selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
	 $asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



	 $sql = "SELECT $selectcol FROM track_countries where country_id='$asset_id'";
	 $result = mysqli_query($con, $sql);


	 while($data = mysqli_fetch_array($result)) {
		  $organisation = $data[0];
		  $organisation = ucwords($organisation);
			  echo $organisation;
	 }




}




function editcompanyphp(){

	global $con;
	global $currdate;
	global $passwd_salt;


	$company_name = mysqli_real_escape_string($con, $_POST['company_name']);
	$company_country = mysqli_real_escape_string($con, $_POST['company_country']);
	$company_phone = mysqli_real_escape_string($con, $_POST['company_phone']);
	$company_email = mysqli_real_escape_string($con, $_POST['company_email']);
	$company_website = mysqli_real_escape_string($con, $_POST['company_website']);
	$company_address = mysqli_real_escape_string($con, $_POST['company_address']);
	$company_city = mysqli_real_escape_string($con, $_POST['company_city']);
	$asset_id = mysqli_real_escape_string($con, $_POST['asset_id']);
	$aplus = "+";


	if( strpos( $company_phone, $aplus ) == false ) {
	
		$company_phone= $aplus.$company_phone;

	}



		$sql = "UPDATE tracking_companies SET company_name='$company_name',company_country='$company_country',
		company_phone='$company_phone',company_email='$company_email',company_website='$company_website',
		company_address='$company_address ',company_town='$company_city' WHERE company_id='$asset_id'";

	
	
	
		if((mysqli_query($con,$sql))){
	
			echo "success";
	
		} else {
	
			echo "failed";
	
		}

	







		mysqli_close($con);



}// submit_companydetailsphp



function selectStoreIDphp(){

	global $con;
	global $currdate;
	global $passwd_salt;



	$datetime = date("Ymd");

	$sql = "SELECT ticket_value +1 FROM track_ticketids where ticket_id='10'";
	$result = mysqli_query($con, $sql);


	while($data = mysqli_fetch_array($result)) {


			if($data[0] > 997){


					$sql = "UPDATE track_ticketids SET ticket_value = 0 WHERE ticket_id='10'";
					mysqli_query($con, $sql);

			}


		 $num_padded = sprintf("%04d", $data[0]);
		 $organisation = 'STR - '.$datetime.' - '.$num_padded;

			echo $organisation;

	}




}// selectcompanyIdphp




function fillstorecompanyphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT company_name,company_id FROM tracking_companies";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='store_company'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $company_name =$data[0];
			   $company_name = ucwords($company_name);
   
			   $company_id =$data[1];
   
			   echo "<option value='$company_id'>$company_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$company_id'>$company_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp




   
function fillstorecountryphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT country_name,country_id FROM track_countries";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='store_country'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $country_name =$data[0];
			   $country_name = ucwords($country_name);
   
			   $country_id =$data[1];
   
			   echo "<option value='$country_id'>$country_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$country_id'>$country_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp
   
   



   function enternewstorephp(){

	global $con;
	global $currdate;
	global $passwd_salt;


	$store_id= mysqli_real_escape_string($con, $_POST['store_id']);
	$store_name = mysqli_real_escape_string($con, $_POST['store_name']);
	$store_company = mysqli_real_escape_string($con, $_POST['store_company']);
	$store_phone = mysqli_real_escape_string($con, $_POST['store_phone']);
	$store_email = mysqli_real_escape_string($con, $_POST['store_email']);
	$store_address = mysqli_real_escape_string($con, $_POST['store_address']);
	$store_country = mysqli_real_escape_string($con, $_POST['store_country']);
	$store_location = mysqli_real_escape_string($con, $_POST['store_location']);
	$aplus = "+";


	if( strpos( $store_phone, $aplus ) == false ) {
	
		$store_phone= $aplus.$store_phone;

	}



	$sql = "SELECT store_name FROM tracking_stores WHERE store_name='$store_name'";
	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {

		//Check if country exists
		echo "exists";

	} else {


		$sql = "INSERT INTO tracking_stores (store_no,store_name,store_company,store_phone,
		store_email,store_address,store_country,store_location,store_datecreated) VALUES
		('$store_id','$store_name','$store_company','$store_phone','$store_email'
		,'$store_address','$store_country','$store_location','$currdate')";
	
	
	
		if((mysqli_query($con,$sql))){
	
			$sql = "UPDATE track_ticketids SET ticket_value = ticket_value + 1 WHERE ticket_id='10'";
			mysqli_query($con, $sql);
			echo "success";
	
		} else {
	
			// echo (mysqli_query($con,$sql));
	
			echo "failed";
	
		}

	

	} //Check if country exists





		mysqli_close($con);



}// submit_companydetailsphp






function selectCountryDetailsNamephp(){

	global $con;
	global $company_session;


	 $selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
	 $asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



	 $sql = "SELECT $selectcol FROM track_countries where country_name='$asset_id'";
	 $result = mysqli_query($con, $sql);


	 while($data = mysqli_fetch_array($result)) {
		  $organisation = $data[0];
			  echo $organisation;
	 }




}



function listallstoresphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';


	


	$sql = "SELECT T1.store_name as store_name,T1.store_phone as store_phone,T1.store_location as store_location,
	T1.store_deactivate as store_deactivate,T1.store_id as store_id, T2.company_name as company_name, T3.country_name as country_name  FROM tracking_stores T1
    INNER JOIN tracking_companies T2 ON T1.store_company = T2.company_id
    INNER JOIN track_countries T3 ON T1.store_country  = T3.country_id
	GROUP BY T1.store_id";

	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {




			 $store_name =$data[0];
			 $store_name =ucwords($store_name);

		
			 $store_phone=$data[1];
			 


			 $store_location =$data[2];
			 $store_location = (strlen($store_location) > 25) ? substr($store_location,0,25).'...' : $store_location;
			 $store_location =ucwords($store_location);

			 $store_deactivate=$data[3];

			 if ($store_deactivate=='Y') {

				$store_deactivate = "<input type='checkbox'  value='$data[4]' checked>";

				   }

				  else {

					$store_deactivate = "<input type='checkbox'  value='$data[4]'>";

			  }

			  $store_id =$data[4];

			
			  $company_name =$data[5];
			  $company_name = (strlen($company_name) > 25) ? substr($company_name,0,25).'...' : $company_name;
			  $company_name =ucwords($company_name);

			  $store_country=$data[6];
			  $store_country =ucwords($store_country);



					$output .= "
					<tr>
					  <td>$store_name </td>
					  <td>$company_name</td>
					  <td>$store_phone</td>
					  <td>$store_country</td>
					  <td>$store_location</td>
					  <td>$store_deactivate</td>
					  <td><span class='list-buttons' >
					  <span class='create-ticket'data-toggle='modal' data-target='#editStoreModal' onclick='javascript:getEditStore(\"$store_id\");'>
					  Edit</span></td>
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp



 
function selectCompanyDetailsIDphp(){

	global $con;
	global $company_session;


	 $selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
	 $asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



	 $sql = "SELECT $selectcol FROM tracking_companies where company_id='$asset_id'";
	 $result = mysqli_query($con, $sql);


	 while($data = mysqli_fetch_array($result)) {
		  $organisation = $data[0];
		  $organisation = ucwords($organisation);
			  echo $organisation;
	 }




}



function selectStoreDetailsphp (){

	global $con;
	global $currdate;
	global $passwd_salt;


				$selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
				$store_id= mysqli_real_escape_string($con, $_POST['store_id']);



	$sql = "SELECT $selectcol FROM tracking_stores where store_id='$store_id'";
	$result = mysqli_query($con, $sql);


	while($data = mysqli_fetch_array($result)) {
		 $organisation = $data[0];
			 echo $organisation;
	}




}





function filleditstorecompanyphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT company_name,company_id FROM tracking_companies";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='editstore_company'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $company_name =$data[0];
			   $company_name = ucwords($company_name);
   
			   $company_id =$data[1];
   
			   echo "<option value='$company_id'>$company_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$company_id'>$company_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp




   

function filleditstorecountryphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT country_name,country_id FROM track_countries";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='editstore_country'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $country_name =$data[0];
			   $country_name = ucwords($country_name);
   
			   $country_id =$data[1];
   
			   echo "<option value='$country_id'>$country_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$company_id'>$company_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp



   
   function editnewstorephp(){

	global $con;
	global $currdate;
	global $passwd_salt;


	$store_id= mysqli_real_escape_string($con, $_POST['store_id']);
	$store_name = mysqli_real_escape_string($con, $_POST['store_name']);
	$store_company = mysqli_real_escape_string($con, $_POST['store_company']);
	$store_phone = mysqli_real_escape_string($con, $_POST['store_phone']);
	$store_email = mysqli_real_escape_string($con, $_POST['store_email']);
	$store_address = mysqli_real_escape_string($con, $_POST['store_address']);
	$store_country = mysqli_real_escape_string($con, $_POST['store_country']);
	$store_location = mysqli_real_escape_string($con, $_POST['store_location']);
	$aplus = "+";


	if( strpos( $store_phone, $aplus ) == false ) {
	
		$store_phone= $aplus.$store_phone;

	}


		$sql = "UPDATE tracking_stores SET store_name='$store_name',store_company='$store_company',
		store_phone='$store_phone',store_email='$store_email',
		store_address='$store_address',store_location='$store_location',store_country='$store_country' WHERE store_id='$store_id'";
	
	
		if((mysqli_query($con,$sql))){
	
		
			echo "success";
	
		} else {
		
			echo "failed";
	
		}

	


		mysqli_close($con);



}// submit_companydetailsphp





function fillusercompanyphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT company_name,company_id FROM tracking_companies";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='user_organisation'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $company_name =$data[0];
			   $company_name = ucwords($company_name);
   
			   $company_id =$data[1];
   
			   echo "<option value='$company_id'>$company_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$company_id'>$company_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp



   

function filluserstoresidphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
		   $asset_id = mysqli_real_escape_string($con, $_POST['asset_id']);
   
		   $sql = "SELECT store_name,store_id FROM tracking_stores WHERE store_company='$asset_id'";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='user_store'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $company_name =$data[0];
			   $company_name = ucwords($company_name);
   
			   $company_id =$data[1];
   
			   echo "<option value='$company_id'>$company_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$company_id'>$company_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp



   

function filleditusercompanyphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT company_name,company_id FROM tracking_companies";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='edituser_organisation'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $company_name =$data[0];
			   $company_name = ucwords($company_name);
   
			   $company_id =$data[1];
   
			   echo "<option value='$company_id'>$company_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$company_id'>$company_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp





   
function filledituserstoresphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
		   $asset_id = mysqli_real_escape_string($con, $_POST['asset_id']);
   
		   $sql = "SELECT store_name,store_id FROM tracking_stores";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='edituser_store'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $company_name =$data[0];
			   $company_name = ucwords($company_name);
   
			   $company_id =$data[1];
   
			   echo "<option value='$company_id'>$company_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$company_id'>$company_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp





   function enternewclassphp(){

	global $con;
	global $currdate;
	global $passwd_salt;


	$asset_classname = mysqli_real_escape_string($con, $_POST['asset_classname']);
	



	$sql = "INSERT INTO tracking_assetclass (class_name) VALUES
	('$asset_classname')";



	if((mysqli_query($con,$sql))){

		echo "success";

	} else {

		// echo (mysqli_query($con,$sql));

		echo "failed";

	}



		mysqli_close($con);



}// submit_companydetailsphp




function listallclassphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';



$sql = "SELECT class_name,class_id FROM tracking_assetclass";


	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {




			 $class_name =$data[0];
			 $class_name =ucwords($class_name);

			 $class_id=$data[1];

					$output .= "
					<tr>
					  <td>$class_name</td>
					  <td><span class='list-buttons' >
					  <span class='create-ticket'data-toggle='modal' data-target='#editclassModal' onclick='javascript:getEditClass(\"$class_id\");'>
					  Edit</span></td>
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp




function selectClassDetailsphp(){

	global $con;
	global $company_session;


	 $selectcol= mysqli_real_escape_string($con, $_POST['selectcol']);
	 $asset_id= mysqli_real_escape_string($con, $_POST['asset_id']);



	 $sql = "SELECT $selectcol FROM tracking_assetclass where class_id='$asset_id'";
	 $result = mysqli_query($con, $sql);


	 while($data = mysqli_fetch_array($result)) {
		  $organisation = $data[0];
			  echo $organisation;
	 }




}




function editnewclassphp(){

	global $con;
	global $currdate;
	global $passwd_salt;


	$assetid = mysqli_real_escape_string($con, $_POST['asset_id']);
	$editasset_classname = mysqli_real_escape_string($con, $_POST['editasset_classname']);
	


	 $sql = "UPDATE tracking_assetclass SET class_name= '$editasset_classname'
	 WHERE user_id='$assetid'";



	if((mysqli_query($con,$sql))){


		echo "success";

	} else {

		// echo (mysqli_query($con,$sql));

		echo "failed";

	}



		mysqli_close($con);



}// submit_companydetailsphp



	
function getassetphp(){
	//--
	global $con;
	global $currdate;
	global $passwd_salt;	   
	   
	   
   
   $sql = "SELECT class_id,class_number,class_name FROM tracking_assetclass";
   $result = mysqli_query($con, $sql);
   
   
   
   $rows = array();
   
   
   while($row = mysqli_fetch_array($result)) {
	   $rows[] = $row; 
   }

//    foreach ($result as $row) {
// 	$rows[] = $row; 
// }
   
   
   mysqli_close($con);
   
   echo json_encode($rows);
	   
				   
				   
	   }	//get_notificationscount()
	   
	   
	   

function listallstoresassetsphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';


	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);


	$sql = "SELECT count(T1.trackass_name) as trackass_count,
	T2.store_name as store_name,T2.store_id as store_id, T3.company_id as company_id FROM tracking_assets T1
	INNER JOIN tracking_stores T2 ON T1.trackass_storeno = T2.store_id
	INNER JOIN tracking_companies T3 ON T1.trackass_organisation  = T3.company_id
	WHERE T1.trackass_organisation LIKE '$company_id%' GROUP BY T2.store_id";



	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {



			 $trackass_count =$data[0];


			 $store_name =$data[1];
			 $store_name = (strlen($store_name) > 45) ? substr($store_name,0,45).'...' : $store_name;
			 $store_name =ucwords($store_name);




					$output .= "
					<tr>
					  <td>$store_name</td>
					  <td>$trackass_count</td>					  
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp




	
function getstoreassetgraphphp(){
	//--
	global $con;
	global $currdate;
	global $passwd_salt;	   
	   
	   
	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
   
   $sql = "SELECT count(T1.trackass_name) as trackass_count,
   T2.store_name as store_name,T2.store_id as store_id, T3.company_id as company_id FROM tracking_assets T1
   INNER JOIN tracking_stores T2 ON T1.trackass_storeno = T2.store_id
   INNER JOIN tracking_companies T3 ON T1.trackass_organisation  = T3.company_id
   WHERE T1.trackass_organisation LIKE '$company_id%' GROUP BY T2.store_id";
   $result = mysqli_query($con, $sql);
   
   
   
   $rows = array();
   
   
   while($row = mysqli_fetch_array($result)) {
	   $rows[] = $row; 
   }

   
   mysqli_close($con);
   
   echo json_encode($rows);
	   
				   
				   
	   }	//get_notificationscount()



	   
function listassetnameentriesphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';


	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
	$store_id = mysqli_real_escape_string($con, $_POST['store_id']);



	$sql = "SELECT count(T1.trackass_name) as trackass_count,T1.trackass_class as trackass_class,
	T2.store_name as store_name,T2.store_id as store_id, T3.company_id as company_id FROM tracking_assets T1
	INNER JOIN tracking_stores T2 ON T1.trackass_storeno = T2.store_id
	INNER JOIN tracking_companies T3 ON T1.trackass_organisation  = T3.company_id
	WHERE T1.trackass_organisation LIKE '$company_id%' and T2.store_id LIKE '$store_id%' GROUP BY T1.trackass_class";



	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {



			 $trackass_count =$data[0];


			 $trackass_name =$data[1];
			 $trackass_name = (strlen($trackass_name) > 45) ? substr($trackass_name,0,45).'...' : $trackass_name;
			 $trackass_name =ucwords($trackass_name);




					$output .= "
					<tr>
					  <td>$trackass_name</td>
					  <td>$trackass_count</td>					  
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp
	   


	
function getstoreassetnamegraphphp(){
	//--
	global $con;
	global $currdate;
	global $passwd_salt;	   
	   
	   
	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
	$store_id = mysqli_real_escape_string($con, $_POST['store_id']);


   
   $sql = "SELECT count(T1.trackass_name) as trackass_count,T1.trackass_class as trackass_class,
	T2.store_name as store_name,T2.store_id as store_id, T3.company_id as company_id FROM tracking_assets T1
	INNER JOIN tracking_stores T2 ON T1.trackass_storeno = T2.store_id
	INNER JOIN tracking_companies T3 ON T1.trackass_organisation  = T3.company_id
	WHERE T1.trackass_organisation LIKE '$company_id%' and T2.store_id LIKE '$store_id%' GROUP BY T1.trackass_class";
   $result = mysqli_query($con, $sql);
   
   
   
   $rows = array();
   
   
   while($row = mysqli_fetch_array($result)) {
	   $rows[] = $row; 
   }

   
   mysqli_close($con);
   
   echo json_encode($rows);
	   
				   
				   
	   }	//get_notificationscount()


	   
function listallstoresincidencesphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';


	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);


	$sql = "SELECT count(T1.incident_ticketno) as incident_count,
	T2.store_name as store_name,T2.store_id as store_id, T3.company_id as company_id FROM tracking_incidences T1
	INNER JOIN tracking_stores T2 ON T1.incident_storeid = T2.store_id
	INNER JOIN tracking_companies T3 ON T1.incident_companyid  = T3.company_id
	WHERE T1.incident_companyid LIKE '$company_id%' GROUP BY T2.store_id";



	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {



			$incident_count =$data[0];


			 $store_name =$data[1];
			 $store_name = (strlen($store_name) > 45) ? substr($store_name,0,45).'...' : $store_name;
			 $store_name =ucwords($store_name);




					$output .= "
					<tr>
					  <td>$store_name</td>
					  <td>$incident_count</td>					  
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp



	
function getstoreincidentgraphphp(){
	//--
	global $con;
	global $currdate;
	global $passwd_salt;	   
	   
	   
	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
   
	$sql = "SELECT count(T1.incident_ticketno) as incident_count,
	T2.store_name as store_name,T2.store_id as store_id, T3.company_id as company_id FROM tracking_incidences T1
	INNER JOIN tracking_stores T2 ON T1.incident_storeid = T2.store_id
	INNER JOIN tracking_companies T3 ON T1.incident_companyid  = T3.company_id
	WHERE T1.incident_companyid LIKE '$company_id%' GROUP BY T2.store_id";

   $result = mysqli_query($con, $sql);
   
   
   
   $rows = array();
   
   
   while($row = mysqli_fetch_array($result)) {
	   $rows[] = $row; 
   }

   
   mysqli_close($con);
   
   echo json_encode($rows);
	   
				   
				   
	   }	//get_notificationscount()



	   	   
function listallnameincidencesphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';


	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
	$store_id = mysqli_real_escape_string($con, $_POST['store_id']);


	$sql = "SELECT count(T1.incident_ticketno) as incident_count,T1.incident_subcategory as incident_subcategory,
	T2.store_name as store_name,T2.store_id as store_id, T3.company_id as company_id FROM tracking_incidences T1
	INNER JOIN tracking_stores T2 ON T1.incident_storeid = T2.store_id
	INNER JOIN tracking_companies T3 ON T1.incident_companyid  = T3.company_id
	WHERE T1.incident_companyid LIKE '$company_id%' and T2.store_id LIKE '$store_id%' GROUP BY T1.incident_subcategory";



	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {



			$incident_count =$data[0];


			 $incident_subcategory  =$data[1];
			 $incident_subcategory  = (strlen($incident_subcategory ) > 45) ? substr($incident_subcategory ,0,45).'...' : $incident_subcategory ;
			 $incident_subcategory  =ucwords($incident_subcategory) ;




					$output .= "
					<tr>
					  <td>$incident_subcategory</td>
					  <td>$incident_count</td>					  
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp




	
function getnameincidentgraph(){
	//--
	global $con;
	global $currdate;
	global $passwd_salt;	   
	   
	   
	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
	$store_id = mysqli_real_escape_string($con, $_POST['store_id']);


   
	$sql = "SELECT count(T1.incident_ticketno) as incident_count,T1.incident_subcategory as incident_subcategory,
	T2.store_name as store_name,T2.store_id as store_id, T3.company_id as company_id FROM tracking_incidences T1
	INNER JOIN tracking_stores T2 ON T1.incident_storeid = T2.store_id
	INNER JOIN tracking_companies T3 ON T1.incident_companyid  = T3.company_id
	WHERE T1.incident_companyid LIKE '$company_id%' and T2.store_id LIKE '$store_id%' GROUP BY T1.incident_subcategory";



   $result = mysqli_query($con, $sql);
   
   
   
   $rows = array();
   
   
   while($row = mysqli_fetch_array($result)) {
	   $rows[] = $row; 
   }

   
   mysqli_close($con);
   
   echo json_encode($rows);
	   
				   
				   
	   }	//get_notificationscount()



	   
function listallcountrystoresphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';


	$country_id = mysqli_real_escape_string($con, $_POST['country_id']);


	$sql = "SELECT count(T1.store_name) as store_count,
	T2.country_name as country_name FROM tracking_stores T1
	INNER JOIN track_countries T2 ON T1.store_country = T2.country_id
	WHERE T1.store_country LIKE '$country_id%' GROUP BY T2.country_id";



	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {



			$store_count =$data[0];


			 $country_name =$data[1];
			 $country_name = (strlen($country_name) > 45) ? substr($country_name,0,45).'...' : $country_name;
			 $country_name =ucwords($country_name);




					$output .= "
					<tr>
					  <td>$country_name</td>
					  <td>$store_count</td>					  
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp




	
function getcountrystoresgraphphp(){
	//--
	global $con;
	global $currdate;
	global $passwd_salt;	   
	   
	   
	$country_id = mysqli_real_escape_string($con, $_POST['country_id']);
	
   
	$sql = "SELECT count(T1.store_name) as store_count,
	T2.country_name as country_name FROM tracking_stores T1
	INNER JOIN track_countries T2 ON T1.store_country = T2.country_id
	WHERE T1.store_country LIKE '$country_id%' GROUP BY T2.country_id";


   $result = mysqli_query($con, $sql);  
   
   
   $rows = array();
   
   
   while($row = mysqli_fetch_array($result)) {
	   $rows[] = $row; 
   }

   
   mysqli_close($con);
   
   echo json_encode($rows);
	   
				   
				   
	   }	//get_notificationscount()




	   	   

function listallcompanyusersphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';


	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);


	$sql = "SELECT count(T1.user_firstname) as user_count,T2.company_name as company_name,
	T2.company_id as company_id FROM tracking_users T1
	INNER JOIN tracking_companies T2 ON T1.user_organisation = T2.company_id
	WHERE T1.user_organisation LIKE '$company_id%' GROUP BY T2.company_id";



	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {



			 $user_count =$data[0];


			 $company_name =$data[1];
			 $company_name = (strlen($company_name) > 45) ? substr($company_name,0,45).'...' : $company_name;
			 $company_name =ucwords($company_name);




					$output .= "
					<tr>
					  <td>$company_name</td>
					  <td>$user_count</td>					  
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp





	
function getcompanyusersgraphphp(){
	//--
	global $con;
	global $currdate;
	global $passwd_salt;	   
	   
	   
	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
   
	$sql = "SELECT count(T1.user_firstname) as user_count,T2.company_name as company_name,
	T2.company_id as company_id FROM tracking_users T1
	INNER JOIN tracking_companies T2 ON T1.user_organisation = T2.company_id
	WHERE T1.user_organisation LIKE '$company_id%' GROUP BY T2.company_id";

   $result = mysqli_query($con, $sql);
   
   
   
   $rows = array();
   
   
   while($row = mysqli_fetch_array($result)) {
	   $rows[] = $row; 
   }

   
   mysqli_close($con);
   
   echo json_encode($rows);
	   
				   
				   
	   }	//get_notificationscount()



	   
	   	   
function listallstoreusersphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';


	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
	$store_id = mysqli_real_escape_string($con, $_POST['store_id']);



	$sql = "SELECT count(T1.user_firstname) as user_count,
	T2.store_name as store_name,T2.store_id as store_id, T3.company_id as company_id FROM tracking_users T1
	INNER JOIN tracking_stores T2 ON T1.user_store = T2.store_id
	INNER JOIN tracking_companies T3 ON T1.user_organisation = T3.company_id
	WHERE T1.user_organisation LIKE '$company_id%' and T1.user_store LIKE '$store_id%' GROUP BY T2.store_name";



	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {



			$user_count =$data[0];


			 $store_name  =$data[1];
			 $store_name  = (strlen($store_name) > 45) ? substr($store_name ,0,45).'...' : $store_name ;
			 $store_name =ucwords($store_name) ;




					$output .= "
					<tr>
					  <td>$store_name</td>
					  <td>$user_count</td>					  
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp






	
function getstoreusersgraphphp(){
	//--
	global $con;
	global $currdate;
	global $passwd_salt;	   
	   
	   
	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
	$store_id = mysqli_real_escape_string($con, $_POST['store_id']);
   
	$sql = "SELECT count(T1.user_firstname) as user_count,
	T2.store_name as store_name,T2.store_id as store_id, T3.company_id as company_id FROM tracking_users T1
	INNER JOIN tracking_stores T2 ON T1.user_store = T2.store_id
	INNER JOIN tracking_companies T3 ON T1.user_organisation = T3.company_id
	WHERE T1.user_organisation LIKE '$company_id%' and T1.user_store LIKE '$store_id%' GROUP BY T2.store_name";

   $result = mysqli_query($con, $sql);
   
   
   
   $rows = array();
   
   
   while($row = mysqli_fetch_array($result)) {
	   $rows[] = $row; 
   }

   
   mysqli_close($con);
   
   echo json_encode($rows);
	   
				   
				   
	   }	//get_notificationscount()



	   

function fillassetrprtcompanyphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT company_name,company_id FROM tracking_companies";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='company_name'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $company_name =$data[0];
			   $company_name = ucwords($company_name);
   
			   $company_id =$data[1];
   
			   echo "<option value='$company_id'>$company_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$company_id'>$company_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp





   function fillassetrprtstorecompanyphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT company_name,company_id FROM tracking_companies";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='storecompany_name'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $company_name =$data[0];
			   $company_name = ucwords($company_name);
   
			   $company_id =$data[1];
   
			   echo "<option value='$company_id'>$company_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$company_id'>$company_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp



   
   

function fillassetrptstoresphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
		   $asset_id = mysqli_real_escape_string($con, $_POST['asset_id']);
   
		   $sql = "SELECT store_name,store_id FROM tracking_stores WHERE store_company LIKE '$asset_id%'";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='store_name'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $company_name =$data[0];
			   $company_name = ucwords($company_name);
   
			   $company_id =$data[1];
   
			   echo "<option value='$company_id'>$company_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value=''>All</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp




	   
   function listallcompanystoresphp(){

	global $con;
	global $currdate;
	global $passwd_salt;
	$output = '';


	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);


	$sql = "SELECT count(T1.store_name) as store_count,
	T2.company_name as company_name FROM tracking_stores T1
	INNER JOIN tracking_companies T2 ON T1.store_company = T2.company_id
	WHERE T1.store_companyid LIKE '$company_id%' GROUP BY T2.company_id";



	$result = mysqli_query($con, $sql);


	if (mysqli_num_rows($result)>0) {


		while($data = mysqli_fetch_row($result)) {



			$store_count =$data[0];


			 $company_name =$data[1];
			 $company_name = (strlen($company_name) > 45) ? substr($company_name,0,45).'...' : $company_name;
			 $company_name =ucwords($company_name);



					$output .= "
					<tr>
					  <td>$company_name</td>
					  <td>$store_count</td>					  
					</tr>
					";



					}

					echo $output;


	}




		mysqli_close($con);



}  // getallCompanyphp




	
function getcompanystoresgraphphp(){
	//--
	global $con;
	global $currdate;
	global $passwd_salt;	   
	   
	   
	$company_id = mysqli_real_escape_string($con, $_POST['company_id']);
	
   
	$sql = "SELECT count(T1.store_name) as store_count,
	T2.company_name as company_name FROM tracking_stores T1
	INNER JOIN tracking_companies T2 ON T1.store_company = T2.company_id
	WHERE T1.store_companyid LIKE '$company_id%' GROUP BY T2.company_id";


   $result = mysqli_query($con, $sql);  
   
   
   $rows = array();
   
   
   while($row = mysqli_fetch_array($result)) {
	   $rows[] = $row; 
   }

   
   mysqli_close($con);
   
   echo json_encode($rows);
	   
				   
				   
	   }	//get_notificationscount()




	   
   
function fillrprtstorecountryphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT country_name,country_id FROM track_countries";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='store_country'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $country_name =$data[0];
			   $country_name = ucwords($country_name);
   
			   $country_id =$data[1];
   
			   echo "<option value='$country_id'>$country_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value='$country_id'>$country_name</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp
   
   


   

   function fillassetIIstorecompanyphp(){
	//--
		   global $con;
		   global $currdate;
		   global $passwd_salt;
   
   
   
		   $sql = "SELECT company_name,company_id FROM tracking_companies";
		   $result = mysqli_query($con, $sql);
   
   
   
   
				 echo "<select class='form-control' id='storecompany_name'>";
   
   
		   while($data = mysqli_fetch_row($result)) {
   
			   $company_name =$data[0];
			   $company_name = ucwords($company_name);
   
			   $company_id =$data[1];
   
			   echo "<option value='$company_id'>$company_name</option>";
   
		   }
   
   
				 echo "<option selected='selected' value=''>All</option>";
				 echo "</select>";
   
   
   
   }// selectcompanyIdphp





   
	
function loginuserphp(){
	//--
	global $con;
	global $currdate;
	global $passwd_salt;	   
	   
	   
	$user_id = mysqli_real_escape_string($con, $_POST['user_id']);
	$passwd_id = mysqli_real_escape_string($con, $_POST['passwd_id']);
	$salted_passwd = $passwd_id.$passwd_salt;

   
   $sql = "SELECT user_id,user_level,CONCAT(user_firstname,' ',user_lastname) as user_name,
   user_organisation,user_store FROM tracking_users 
   WHERE user_password= SHA1('$salted_passwd') AND user_code='$user_id'";
   $result = mysqli_query($con, $sql);
   
   
   
   $rows = array();
  
   
   while($row = mysqli_fetch_array($result)) {
	   $rows[] = $row; 

	   $user_id =$row[0];


	   $user_name =$row[2];
	   $user_name = (strlen($user_name) > 10) ? substr($user_name,0,10).'...' : $user_name;
	   $user_name =ucwords($user_name);


	   $user_level =$row[1];
		   
	   array_push($rows, array('user_id' => $user_id,'user_name' => $user_name,'user_level' => $user_level)); 

   }

   
   
   mysqli_close($con);
   
   echo json_encode(array_values($rows));
//    json_encode(array_values($data));
	//+++++++++++++++
	
	

				   
}	//get_notificationscount()
   


?>
