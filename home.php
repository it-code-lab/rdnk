<?php
if (session_status() == PHP_SESSION_NONE) {
   session_start(); // Start session if it's not already started
}
include_once("php/session.php");

//Saurabh-SM-Change for - PHP 7 to 8 
ini_set('display_errors', 0); // Disable error display
ini_set('log_errors', 1);     // Log errors to a file
error_reporting(E_ALL);       // Report all errors



$title = "Reader Nook";
$description = "Explore a wide range of educational tutorials in math, science,
 social studies, computers, and more. Enhance your knowledge and skills with
  our engaging lessons and interactive resources";
//$image_url = "Your Image URL";
$keywords = "Software, IT, Tutorials, Code Samples";

//SM-TODONE-Revert below
$page_url = $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
$path = urldecode($_SERVER["REQUEST_URI"]);
$path = substr($path, 1);

$isPHPUrl = false;

$techClassListHTML = getTechClassListHTML($database, "", "");

$isCrawler = isset($_SERVER['HTTP_USER_AGENT'])
   && preg_match('/bot|crawl|slurp|spider|mediapartners|InspectionTool|GoogleOther/i', $_SERVER['HTTP_USER_AGENT']);

function getTechClassListHTML($database, $technologyFilter, $tutTitle)
{
   $rows = $database->gettutorials();
   // Filter the rows based on 'discontinue' property if 'the.smusr' is not set
   if (!($_SESSION['smusr'])) {
      $rows = array_filter($rows, function ($entry) {
         return $entry['discontinue'] == "0";
      });
   }
   
   $techClassListHTML = "";
   //SM-Needed to reindex the elements in order
   $rows = array_values($rows);

   for ($i = 0; $i < count($rows); $i++) {
      $techclass = $rows[$i]['techclass'];
      $imagesrc = replaceSpacesWithHyphen($techclass);
      $imagesrc = strtolower($imagesrc);
  
      if ($i == 0 || $techclass != $rows[$i - 1]['techclass']) {
          $techClassListHTML .= "<a href='javascript:void(0);' onclick='storeTechclass(\"" . htmlspecialchars($techclass) . "\")'><div class='menucard' >";
  
          $imagePath = $_SERVER['DOCUMENT_ROOT'] . "/readernook/images/" . $imagesrc . ".png";
  
          if (file_exists($imagePath)) {
              $techClassListHTML .= "<img src='/readernook/images/" . $imagesrc . ".png' alt='Tutorials' class='homeCardImg'>";
          } else {
              $techClassListHTML .= "<img src='/readernook/images/default.png' alt='Tutorials' class='homeCardImg'>";
          }
  
          $techClassListHTML .= "<div class='homeCardText'>" . $techclass . "</div><hr></div></a>";
      }
  }


   return $techClassListHTML;
}

function replaceSpacesWithHyphen($str)
{
    return str_replace(" ", "-", $str);
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-JMD8K2RLDE"></script>
   <script>
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());

   gtag('config', 'G-JMD8K2RLDE');
   </script>

   <meta charset="utf-8" />
   <title><?php echo $title; ?></title>
   <meta name="description" content="<?php echo htmlspecialchars($description, ENT_QUOTES, 'UTF-8'); ?>">
   <meta property="og:title" content="<?php echo htmlspecialchars($title, ENT_QUOTES, 'UTF-8'); ?>">
   <meta property="og:description" content="<?php echo htmlspecialchars($description, ENT_QUOTES, 'UTF-8'); ?>">

   <meta property="og:url" content="<?php echo $page_url; ?>">
   <meta name="keywords" content="<?php echo $keywords; ?>">

   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
   <meta name="author" content="Numerouno" />

   <!-- Favicon-->
   <link rel="icon" type="image/x-icon" href="/readernook/assets/favicon.ico" />
   <link rel="canonical" href="https://readernook.com" />
   <?php include 'main-links.html'; ?>
   <?php include 'head-add.html'; ?>
   <script type="application/ld+json">{
         "@context": "https://schema.org/",
         "@type":"WebSite","url":"https://readernook.com/",
         "name": "Reader Nook - Read and Learn",
         "datePublished": "2022-07-10",
         "description": "Reader Nook - Read and Learn.",
         "thumbnailUrl": "https://readernook.com/images/banner.png"         
       }
       </script>

</head>

<body>
<div class="d-flex" id="wrapper">
    <!-- Page content wrapper-->
    <div id="page-content-wrapper">
       <!-- Top navigation-->
       <body>
         <?php include 'topnav.php'; ?>
         </body>
       <!-- End of Top navigation-->
       <!-- Page content-->
       <body>

       <div id="containerNHelpDivId" >
          <svg id="bgSVGId" class="bgSVG displayNone" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#7559DA" fill-opacity="1" d="M0,224L30,197.3C60,171,120,117,180,117.3C240,117,300,171,360,197.3C420,224,480,224,540,208C600,192,660,160,720,165.3C780,171,840,213,900,245.3C960,277,1020,299,1080,272C1140,245,1200,171,1260,165.3C1320,160,1380,224,1410,256L1440,288L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>

          <div id="mainContainer" class="panel-container panel-left">

             <!--*************************************************************--->
             <!--***********************START - HOME DIV**********************--->
             <!--*************************************************************--->
             <div id="homeDivId" classXX="displayNone">
                <div class="bannerParent">
                   <div class="bannerContainer">
                      <div class="bannerContent" >
                         <!-- <div class="bannerinner">
                            <i class='fas fa-desktop desktop-icon'></i> <i class="divider"></i> Reader Nook
                         </div> -->
                         <label class="bannerLargeText scale-in-center" style="animation-delay: 0.8s; animation-duration: 0.5s;">Reader Nook</label>
                         <br>
                         <hr class="slide-in-left" style="animation-delay: 0.2s">
                         <label class="bannerSmallText scale-in-center" style="animation-delay: 1.2s; animation-duration: 1s;">Learning made easy</label>
                      </div>
                   </div>
                   
                   <div id="homeCardsContainerDivId">
                     <?php echo $techClassListHTML; ?>
                   

                      <a href="/readernook/contactus">
                      <div class="menucard" onclick="Show('contactus')">
                         <img src="/readernook/images/howto.png" alt="File Scan" class="homeCardImg">
                         <div class="homeCardText">Question or Comments</div>
                         <hr>
                      </div>
                    </a>
                   </div>
                 

                   <div  style="display:none; background-color: rgba(9, 84, 132); width: 100%; margin: 0px; padding: 20px; ">
                      <label style="color: white"> Lots of programming languages supported. Some of them are listed
                         below. </label>
                      <hr style="color: #ccc">
                      <div style="display: flex; flex-direction: row; width: 100%; margin: auto; overflow: auto">
                         <img src="/readernook/images/java.png" alt="Java" class="languageicon">
                         <img src="/readernook/images/python.png" alt="python" class="languageicon">
                         <img src="/readernook/images/javascript.png" alt="JavaScript" class="languageicon">
                         <img src="/readernook/images/php.png" alt="php" class="languageicon">
                         <img src="/readernook/images/html.png" alt="html" class="languageicon">
                         <img src="/readernook/images/csharp.png" alt="c#" class="languageicon">
                         <img src="/readernook/images/cobol.png" alt="cobol" class="languageicon">
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
       <form id="techclassForm" method="post" action="/readernook/topics">
         <input type="hidden" name="selectedTechclass" id="selectedTechclass">
      </form>
       <?php include 'footer.html'; ?>
       
</body>
<script>
   function storeTechclass(techclass) {
    document.getElementById('selectedTechclass').value = techclass;
    document.getElementById('techclassForm').submit(); // Submit form
   }
</script>
</html>