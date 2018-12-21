<?php
if (isset($_GET['recipeID'])) {
  $id = (int) $_GET['recipeID'];
  if ($id == 11) {
    header('location: http://www.vivrepourmanger.com/candy-sushi/');
  }
}
?>
<?php require_once('../Connections/egatetif.php'); ?>
<?php
mysql_select_db($database_egatetif, $egatetif);
$query_rsRecipes = "SELECT * FROM recipes WHERE block <> 1 ORDER BY title ASC";
$rsRecipes = mysql_query($query_rsRecipes, $egatetif) or die(mysql_error());
$row_rsRecipes = mysql_fetch_assoc($rsRecipes);
$totalRows_rsRecipes = mysql_num_rows($rsRecipes);

$colname_rsContent = "0";
if (isset($_GET['recipeID'])) {
  $colname_rsContent = (get_magic_quotes_gpc()) ? $_GET['recipeID'] : addslashes($_GET['recipeID']);
}
mysql_select_db($database_egatetif, $egatetif);
$query_rsContent = sprintf("SELECT * FROM recipes WHERE recipeID = %s", $colname_rsContent);
$rsContent = mysql_query($query_rsContent, $egatetif) or die(mysql_error());
$row_rsContent = mysql_fetch_assoc($rsContent);
$totalRows_rsContent = mysql_num_rows($rsContent);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-US">
<head>
   <title>Tiffany's Recipe Box</title>

   <meta name="credit" content="thanks for the yummy code, bob (eggplant.ca)">

<link href="../styles/tif.css" rel="stylesheet" type="text/css">
</head>
<body>
<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" width="100%" Height="200">

        <TR>
          <td valign="center" width="100%">
      <table border=0 cellspacing=0 cellpadding=0 width="100%">

        <tr>

          <td width="10%" align="center">&nbsp;</td>
          <td width="285" align="center">&nbsp;</td>
          <td width="10%" align="center">&nbsp;</td>
          <td width="60%" colspan="3" align="center">&nbsp;</td>
          <td width="10%" align="center">&nbsp;</td>
        </tr>

        <tr>

          <td height="30" align="center">&nbsp;</td>
          <td width="285" rowspan="5" align="center" valign="middle"><a href="index.php"><img src="../images/recipebox.gif" width="100" height="109" border="0"></a></td>
          <td height="30" align="center">&nbsp;</td>
          <td height="30" colspan="3" align="center">&nbsp;</td>
          <td height="30" align="center">&nbsp;</td>
        </tr>


        <tr>


          <td height=1 bgcolor="#ffffff"></td>
          <td bgcolor="#ffffff"></td>
          <td bgcolor="#ffffff"></td>
          <td width="60%" bgcolor="#ffffff"></td>
          <td width="60%" bgcolor="#ffffff"></td>
          <td bgcolor="#ffffff"></td>
        </tr>


        <tr>


          <td width="10%" height="50" align="center" valign="center" bgcolor="#ff9900">


          <td height="50" colspan="5" align="center" valign="center" bgcolor="#ff9900">
                      <font size="4"><FONT face="Times New Roman"><STRONG>
            t i f f a n y ' s &nbsp;&nbsp;r e c i p e&nbsp;&nbsp; b o x</STRONG></font></font></tr>


        <TR>


          <td height=1 bgcolor="#ffffff"></td>
          <td height=1 bgcolor="#ffffff"></td>
          <td height=1 bgcolor="#ffffff"></td>
          <td height=1 bgcolor="#ffffff"></td>
          <td height=1 bgcolor="#ffffff"></td>
          <td height=1 bgcolor="#ffffff"></td>
        </TR>


        <tr>

          <td height="30" align="center">&nbsp;</td>
          <td height="30" align="center">&nbsp;</td>
          <td height="30" colspan="3" align="center">&nbsp;</td>
          <td height="30" align="center">&nbsp;</td>
        </tr>





        <tr>

          <td align="center">&nbsp;</td>
          <td align="center">&nbsp;</td>
          <td align="center">&nbsp;</td>
          <td colspan="3" align="center">&nbsp;</td>
          <td align="center">&nbsp;</td>
        </tr>
      </table></td>
        </TR>
      </TABLE>
<table border="0" cellspacing="10" cellpadding="0">
  <tr>
    <td valign="top">
<p class="copymediumbold"><font color="#FFD18C">RECIPES</font></p>
      <table border="0" align="center" cellpadding="0" cellspacing="5">
        <tr>
          <td><img src="../images/p.gif" width="18" height="18" align="absmiddle"></td>
          <td><span class="copymedium"><font size="-2">= PHOTOGRAPH</font></span></td>
        </tr>
        <tr>
          <td width="18" height="21"><img src="../images/t.gif" width="18" height="18" align="absmiddle"></td>
          <td><span class="copymedium"><font size="-2">= TIFFANY RECOMMENDS</font></span></td>
        </tr>
      </table>
<br>
      <table width="250" border="0" cellspacing="0" cellpadding="3">
<?php do { ?>
	  <tr valign="middle" height="18">
		<td>
			<?php if ($row_rsRecipes['image3'] > "") { ?>
			<img src="../images/p.gif" width="18" height="18" align="absmiddle">
			<?php } ?>
		</td>
		<td>
			<?php if ($row_rsRecipes['rec'] == 1) { ?>
			<img src="../images/t.gif" width="18" height="18" align="absmiddle">
			<?php } ?>
		</td>
		<td align="left" class="copymediumbold"><a href="index.php?recipeID=<?php echo $row_rsRecipes['recipeID']; ?>"><?php echo $row_rsRecipes['title']; ?></a></td>
			  <td height="22" align="center"><nobr>
				</nobr>
		</td>
  </tr>
<?php } while ($row_rsRecipes = mysql_fetch_assoc($rsRecipes)); ?>
</table>

</td>

<td bgcolor="#FFFFFF" width="1"><img src="../images/spacer.gif" width="1"></td>
    <td valign="top">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <?php if ( $row_rsContent['contents'] <> NULL ){ ?>
			  <p class="copymediumbold"><font color="#FFD18C"><?php echo $row_rsContent['title']; ?></font>
			  <?php if ($row_rsContent['rec'] == 1) { ?>
              <img src="../images/t.gif" width="18" height="18" align="absmiddle">
              <?php } ?>
			  </p>
          </td>
          <td width="10">&nbsp;</td>
          <td width="200">&nbsp;</td>
        </tr>
        <tr>
          <td align="left" valign="top">
			<br>
            <?php
		     /* print recipe contents */
		     echo '<p class="copy">';
		     print nl2br($row_rsContent['contents']);
		     echo '</p>';
		     ?>

            <?php
		     /* show final image */
		     if ($row_rsContent['image3'] <> NULL) {
		        echo '
				<p class="copy"><img src="../images/recipes/' . $row_rsContent['image3'] . '"><br>
				' . $row_rsContent['caption3'] . '<br>
				' . $row_rsContent['credit3'] . '<br><br>
				</p>';
			 }
			 ?>
			 <font size="-2" face="verdana">&raquo; <a href="/recipes/">Go to Tiffany's Recipe Box</a></font><br>
			 <?php } else { ?>
			 <p class="copymediumbold"><font color="#FFD18C">Welcome to Tiffany's Recipe Box</font></p>

            <p class="copybold"><img src="../images/recipes/humoussm.jpg" width="250" height="253" hspace="20" align="right"><span class="copy">Here I've collected some of the recipes I want my friends and others to try, or in some cases, just keep recipes that I want to try.</span></p>
            <p class="copy">If a recipe has a &quot;Tiffany Recommends&quot; icon next to its name, then I have tried it, like it and think you should try it too. If it doesn't have one, then I haven't tried it either. If I've tried it and didn't like it, then I have deleted it!</p>
            <p class="copybold">Most recent favourite additions:<br>
              <span class="copy">- <a href="index.php?recipeID=59">Puebla Chicken and Potato Stew</a><br>
- <a href="index.php?recipeID=55">Wonton Soup with Bok Choy</a></span></p>
            <p class="copybold">
              <?php } ?>
			 <font size="-2" face="verdana">&raquo; <a href="/">Go to tif.ca</a></font>		    </p>          </td>
          <td valign="top" align="left">&nbsp;</td>
          <td width="200" align="left" valign="top">
            <?php

/* print recipe comment1 */
if ($row_rsContent['comment1'] <> NULL ) { ?>
<table width="200" border="0" cellspacing="5" cellpadding="3">
  <tr>
    <td height="6" colspan="3" align="left" valign="middle"><hr align="center" width="100%" size="1" noshade color="#000000" class="hrline">
    </td>
  </tr>
  <tr>
    <td width="5%" height="1" align="left" valign="top"></td>
    <td width="90%" align="left" valign="top" class="recipecomment"><?php echo $row_rsContent['comment1'] ?></td>
    <td width="5%" align="left" valign="top"></td>
  </tr>
  <tr>
    <td height="6" colspan="3" align="left" valign="middle"><hr align="center" width="100%" size="1" noshade color="#000000" class="hrline">
    </td>
  </tr>
</table>
<?php } ?>

          </td>
        </tr>
      </table></td>
  </tr>
</table>

</body>
</html>
<?php
mysql_free_result($rsRecipes);
mysql_free_result($rsContent);
?>
