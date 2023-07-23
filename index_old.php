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

//$isCrawler = true;

if (strpos($path, 'topics/') !== false) {
   $itemstr = substr($path, strpos($path, "topics/") + 7);
   if (strpos($itemstr, '/') !== false) {
      $isPHPUrl = true;
      if (isset($_SESSION['datafetched_XX'])) {
         $title = $_SESSION['webTitle'];
         $description = $_SESSION['webDesc'];
         //$image_url = "https://readernook.com/getimage/".$_SESSION['image_nm'];
         $keywords = $_SESSION['webKeywords'];
         $webFullDesc = $_SESSION['webFullDesc'];
      } else {
         $dummy = $database->getTutorial($itemstr);
         if ($dummy != "Err in DB call") {
            $title = $_SESSION['webTitle'];
            $description = $_SESSION['webDesc'];
            //$image_url = "https://readernook.com/getimage/".$_SESSION['image_nm'];
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
<?php include 'body-main.html'; ?>
</body>

</html>