<?php
function displayGrid($grid, $x, $y)
{
    for ($row = 0; $row < $y; $row++) {
        echo "+";
        for ($col = 0; $col < $x; $col++) {
            echo "---+";
        }
        echo "\n|";
        for ($col = 0; $col < $x; $col++) {
            echo " " . $grid[$row][$col] . " |";
        }
        echo "\n";
    }
    echo "+";
    for ($col = 0; $col < $x; $col++) {
        echo "---+";
    }
    echo "\n";
}

function initGrid($x, $y)
{
    $grid = [];
    for ($i = 0; $i < $y; $i++) {
        $grid[$i] = array_fill(0, $x, " ");
    }
    return $grid;
}

function addShip(&$grid, $x, $y, $posX, $posY)
{
    if ($posX >= 0 && $posX < $x && $posY >= 0 && $posY < $y) {
        if ($grid[$posY][$posX] == "X") {
            echo "The ship has already been placed in this position.\n";
        } else {
            $grid[$posY][$posX] = "X";
            echo "The ship is positioned [$posX, $posY].\n";
        }
    } else {
        echo "Incorrect coordinates.\n";
    }
}

function attack(&$grid, $posX, $posY)
{
    if ($grid[$posY][$posX] == "X") {
        echo "It's a hit! The ship is sunk.\n";
        $grid[$posY][$posX] = "O";
        return true;
    } else {
        echo "Missed.\n";
        return false;
    }
}

function hasShips($grid)
{
    foreach ($grid as $row) {
        if (in_array("X", $row)) {
            return true;
        }
    }
    return false;
}

function battleshipGame()
{
    $x = 5;
    $y = 5;
    $gridPlayer1 = initGrid($x, $y);
    $gridPlayer2 = initGrid($x, $y);

    echo "Player 1, position your ships:\n";
    for ($i = 1; $i <= 2; $i++) {
        $posX = (int)readline("Enter the X coordinate for the ship $i: ");
        $posY = (int)readline("Enter the Y coordinate for the ship $i: ");
        addShip($gridPlayer1, $x, $y, $posX, $posY);
    }

    echo "Player 2, position your ships:\n";
    for ($i = 1; $i <= 2; $i++) {
        $posX = (int)readline("Enter the X coordinate for the ship $i: ");
        $posY = (int)readline("Enter the Y coordinate for the ship $i: ");
        addShip($gridPlayer2, $x, $y, $posX, $posY);
    }

    $turn = 1;
    while (true) {
        echo "\nPlayer Field 1:\n";
        displayGrid($gridPlayer1, $x, $y);

        echo "\nПоле игрока 2:\n";
        displayGrid($gridPlayer2, $x, $y);

        if ($turn == 1) {
            echo "Player 1's move:\n";
            $posX = (int)readline("Enter the X coordinate for the attack: ");
            $posY = (int)readline("Enter the Y coordinate for the attack: ");
            if (attack($gridPlayer2, $posX, $posY)) {
                if (!hasShips($gridPlayer2)) {
                    echo "Player 1 wins!\n";
                    break;
                }
            }
            $turn = 2;
        } else {
            echo "Player's move 2:\n";
            $posX = (int)readline("Enter the X coordinate for the attack: ");
            $posY = (int)readline("Enter the Y coordinate for the attack: ");
            if (attack($gridPlayer1, $posX, $posY)) {
                if (!hasShips($gridPlayer1)) {
                    echo "Player 2 wins!\n";
                    break;
                }
            }
            $turn = 1;
        }
    }
}

battleshipGame();
