<?php
include_once("php/session.php");

$title = "Reader Nook";
$description = "Explore a wide range of educational tutorials in math, science,
 social studies, computers, and more. Enhance your knowledge and skills with
  our engaging lessons and interactive resources";
//$image_url = "Your Image URL";
$keywords = "Software, IT, Tutorials, Code Samples";

//SM-TODONE-Revert below
$page_url = $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
//$page_url = $_SERVER["REQUEST_URI"];

$path = urldecode($_SERVER["REQUEST_URI"]);
$path = substr($path, 1);
$isPHPUrl = false;
$isCrawler = isset($_SERVER['HTTP_USER_AGENT'])
   && preg_match('/bot|crawl|slurp|spider|mediapartners|InspectionTool|GoogleOther/i', $_SERVER['HTTP_USER_AGENT']);



if (strpos($path, 'tutorials/') !== false) {
   $itemstr = substr($path, strpos($path, "tutorials/") + 10);
   if (strpos($itemstr, '/') !== false) {
      $isPHPUrl = true;
      if (isset($_SESSION['datafetched_XX'])) {
         $title = $_SESSION['webTitle'];
         $description = $_SESSION['webDesc'];
         //$image_url = "https://itcodescanner.com/getimage/".$_SESSION['image_nm'];
         $keywords = $_SESSION['webKeywords'];
         $webFullDesc = $_SESSION['webFullDesc'];
      } else {
         $dummy = $database->getTutorial($itemstr);
         if ($dummy != "Err in DB call") {
            $title = $_SESSION['webTitle'];
            $description = $_SESSION['webDesc'];
            //$image_url = "https://itcodescanner.com/getimage/".$_SESSION['image_nm'];
            $keywords = $_SESSION['webKeywords'];
            $webFullDesc = $_SESSION['webFullDesc'];
         }
      }
   }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-2HXRRR286M"></script>
   <script>
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());

   gtag('config', 'G-2HXRRR286M');
   </script>

   <meta charset="utf-8" />

   <title><?php echo $title; ?></title>
   <meta name="description" content="<?php echo $description; ?>">
   <meta property="og:title" content="<?php echo $title; ?>">
   <meta property="og:description" content="<?php echo $description; ?>">

   <meta property="og:url" content="<?php echo $page_url; ?>">
   <meta name="keywords" content="<?php echo $keywords; ?>">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
   <meta name="author" content="Numerouno" />
   <title>Read and Learn</title>
   <!-- Favicon-->
   <link rel="icon" type="image/x-icon" href="/readernook/assets/favicon.ico" />
   <link rel="canonical" href="https://readernook.com" />
   <!-- Core theme CSS (includes Bootstrap)-->
   <link href="/readernook/css/styles.css" rel="stylesheet" />
   <link href="/readernook/css/codemirror.css" rel="stylesheet" />
   <!--  
         <link href="/readernook/css/bootstrap.min.css" rel="stylesheet" />
         -->
   <link href="/readernook/css/readernook-v1.6.css" rel="stylesheet" />
   <link href="/readernook/css/smstylegtlimit.css" rel="stylesheet" />
   <link href="/readernook/css/smstyleltlimit.css" rel="stylesheet" />
   <link href="/readernook/css/slidestyles.css" rel="stylesheet" />
   <link href="/readernook/css/smtheme-v1.05.css" rel="stylesheet" />
   <script src="/readernook/web/common-editor-function.js"></script>
   <script src="/readernook/web/common-function-v1.8.js"></script>
   <!-----
         <script src="/readernook/web/common-function-mini.js"></script>
         -->

   <?php if (!$isCrawler || !$isPHPUrl): ?>
      <?php include 'head-add.html'; ?>
   <?php endif; ?>

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
<?php if (!$isCrawler || !$isPHPUrl): ?>
   <?php include 'body-main.html'; ?>
<?php else: ?>
   <h1> <?= $_SESSION['webTitle'] ?> </h1><br>
   
   
   <div style="margin: auto; padding:10px">
   <?= $_SESSION['webFullDesc'] ?>
   </div>
<?php endif; ?>

</body>

</html>