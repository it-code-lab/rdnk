<?php
include_once("php/session.php");

$the['hosturl'] = "/readernook";

$tutorialList = $database->gettutorials();

$path = urldecode($_SERVER["REQUEST_URI"]);
$path = substr($path, 1);

$tutorialsPageFlag = false;

$isLoggedin = $_SESSION['isLoggedin'];

if (strpos($path, '/topics') !== false) {
   $tutorialsPageFlag = true;
}
//$rows = $tutorialList;
// Filter the array to include only entries with 'discontinue' value equal to "0"
$rows = array_filter($tutorialList, function ($entry) {
   return $entry['discontinue'] == "0";
});

//SM-Needed to reindex the elements in order
$rows = array_values($rows);

$innHTML = "";
$temp = "";
for ($i = 0; $i < count($rows); $i++) {
   if ($rows[$i]['technology']) {
      if (($i == 0) || ($rows[$i]['technology'] != $rows[$i - 1]['technology'])) {
         $innHTML .= "<a href='" . $the['hosturl'] . "/topics/" . $rows[$i]['technology'] . "'>" . $rows[$i]['technology'] . "</a>";
      }
   }
}

?>
<div class="topnav" id="myTopnav">
      <a id="homeLinkId" href="/readernook/home">HOME</a>

      <a id="tutorialLinkId" href="/readernook/topics">TOPICS <i  class="fa fa-caret-down"></i></a>
      <div id="dropDownTutListId" class="dropdown-content">
      <?php echo $innHTML; ?>
      </div>
               

      <a id="projectscannerLinkId" style="display:none" href="/readernook/?target=projectscanner">PROJECT SCANNER</a>
      <a id="filescannerLinkId" style="display:none" href="/readernook/?target=filescanner">FILE SCANNER</a>
      <a id="HelpTopicsLinkId" style="display:none" href="/readernook/?target=HelpTopics">HELP TOPICS</a>
      <a id="howtoLinkId" style="display:none" href="/readernook/?target=howto">HOW TO VIDEOS</a>
      <a id="contactusLinkId" href="/readernook/contactus">CONTACT US</a>

      <?php if ($isLoggedin): ?>
         <a id="loginLinkId" style="display:none" href="/readernook/login">LOG IN</a>
         <a id="logoutLinkId"  href="javascript:Logout()">LOGOUT</a>
         <a id="profileLinkId" href="/readernook/profile"">PROFILE</a>
      <?php else: ?>
         <a id="loginLinkId" href="/readernook/login">LOG IN</a>
         <a id="logoutLinkId"  style="display:none" href="javascript:Logout()">LOGOUT</a>
         <a id="profileLinkId" style="display:none" href="/readernook/profile"">PROFILE</a>
      <?php endif; ?>
      
      
      <a id="buymecoffee" href="https://www.buymeacoffee.com/smah" target="_blank">
         <i id="coffeeBtn" class="fas fa-coffee"
            style=" font-size: 12px; border-radius: 5px; padding: 2px; ">&nbsp; <span
               style="font-family: var(--bs-font-sans-serif); font-size: 14px; font-weight: 300;">Buy me a coffee
               <span></i>
      </a>
      <?php if ($tutorialsPageFlag): ?>
         <a class="searchWrapper"><span id="itemsearchDivId">
            <form autocomplete="off" class="dummyForm">
               <input id='tutorial-search-box' data-dropdownset='n' type='text' name='item' autocomplete='off'
                  placeholder='search' />
               <button id="itemsearchBtnId" class='' onclick='searchTutorial(); return false;'><i
                     class="fas fa-search"></i></button>
            </form>
            </span>
         </a>
      <?php endif; ?>
      
      <a href="javascript:void(0);" class="icon" style="margin-right: 20px" onclick="myTopNavFunction()">
            <i class="fa fa-bars"></i>
      </a>
</div>
<script>
   //console.log("<?php echo $isLoggedin ?>");

   let pageName = "";
   if ("<?php echo $tutorialsPageFlag ?>"){
      pageName = "tutorial";
   }else {
      var path = window.location.pathname;
      pageName =path.replaceAll("/readernook/", "");
   }
   if (pageName == ""){
      pageName = "tutorial";
   }
   x = document.getElementById(pageName + "LinkId");
   x.className += " active";
</script>