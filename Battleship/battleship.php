<?php

function colle($x, $y, array $ships = [])
{
    if ($x < 1 || $y < 1) {
        return;
    }

    $grit = [];
    for ($i = 0; $i < $y; $i++) {
        $grit[$i] = array_fill(0, $x, " ");
    }

    foreach ($ships as $pos) {
        $xx = $pos[0];
        $yy = $pos[1];
        if ($xx >= 0 && $xx < $x && $yy >= 0 && $yy < $y) {
            $grit[$yy][$xx] = "X";
        }
    }

    for ($row = 0; $row < $y; $row++) {
        echo "+";
        for ($col = 0; $col < $x; $col++) {
            echo "---+";
        }
        echo "\n";
        echo "|";
        for ($col = 0; $col < $x; $col++) {
            echo " " . $grit[$row][$col] . " |";
        }
        echo "\n";
    }
    echo "+";
    for ($col = 0; $col < $x; $col++) {
        echo "---+";
    }
    echo "\n";
}

colle(5, 3, [[0, 1], [2, 1], [1, 2], [1, 7]]);
