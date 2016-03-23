<?php

/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */


$boolean = true;
$int     = 0;
$float   = 0.0;
$str     = '';
$array   = array();


$start = microtime(true);
for ( $i = 0; $i < 1000000; ++$i) {



}
$end = sprintf("%01.04f", microtime(true) - $start);
echo '[ ' . $end . ' sec ]' . "\n";


$start = microtime(true);
for ( $i = 0; $i < 1000000; ++$i) {



}
$end = sprintf("%01.04f", microtime(true) - $start);
echo '[ ' . $end . ' sec ]' . "\n";


/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
 
