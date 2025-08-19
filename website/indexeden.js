<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Eden's Pharm</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css"> <!-- Custom styles can go here -->
</head>

<body>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Eden's Pharm</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ml-auto">
                <!-- Hydrasal for Crews Dropdown -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="hydrasalCrewsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Hydrasal for Crews
                    </a>
                    <div class="dropdown-menu" aria-labelledby="hydrasalCrewsDropdown">
                        <a class="dropdown-item" href="#">Energize</a>
                        <a class="dropdown-item" href="#">Recovery</a>
                    </div>
                </li>

                <!-- Hydrasal Dropdown -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="hydrasalDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Hydrasal
                    </a>
                    <div class="dropdown-menu" aria-labelledby="hydrasalDropdown">
                        <a class="dropdown-item" href="#">Raw</a>
                        <a class="dropdown-item" href="#">Strawberry</a>
                        <a class="dropdown-item" href="#">Triple Cherry</a>
                        <a class="dropdown-item" href="#">Citrus Lemon</a>
                        <a class="dropdown-item" href="#">Mango White Peach</a>
                        <a class="dropdown-item" href="#">Watermelon</a>
                        <a class="dropdown-item" href="#">Concord Grape</a>
                    </div>
                </li>

                <!-- Elation Dropdown -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="elationDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Elation
                    </a>
                    <div class="dropdown-menu" aria-labelledby="elationDropdown">
                        <a class="dropdown-item" href="#">Energy</a>
                        <a class="dropdown-item" href="#">Estrogen</a>
                        <a class="dropdown-item" href="#">Focus</a>
                        <a class="dropdown-item" href="#">Gut Health</a>
                        <a class="dropdown-item" href="#">Heart</a>
                        <a class="dropdown-item" href="#">Healing Mushroom</a>
                        <a class="dropdown-item" href="#">Relax</a>
                        <a class="dropdown-item" href="#">Sleep</a>
                        <a class="dropdown-item" href="#">Testosterone</a>
                    </div>
                </li>

                <!-- The Blends Menu -->
                <li class="nav-item">
                    <a class="nav-link" href="#">The Blends</a>
                </li>

                <!-- About Dropdown -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="aboutDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        About
                    </a>
                    <div class="dropdown-menu" aria-labelledby="aboutDropdown">
                        <a class="dropdown-item" href="#">Contact Us</a>
                        <a class="dropdown-item" href="#">Mission and Values</a>
                        <a class="dropdown-item" href="#">About Us</a>
                        <a class="dropdown-item" href="#">Research References</a>
                        <a class="dropdown-item" href="#">Blog</a>
                        <a class="dropdown-item" href="#">Gallery</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Content -->
    <div class="container">
        <div class="jumbotron text-center mt-5">
            <h1>Welcome to Eden's Pharm</h1>
            <p>Your source for premium hydration and health solutions.</p>
        </div>

        <!-- Section for Products or Info -->
        <div class="row">
            <div class="col-md-6">
                <h2>Featured Products</h2>
                <p>Discover our line of premium hydration products like Hydrasal and Elation.</p>
            </div>
            <div class="col-md-6">
                <h2>Our Mission</h2>
                <p>At Eden's Pharm, we are committed to bringing the best in health and wellness to you, starting with our revolutionary electrolyte formulas.</p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="text-center mt-5 bg-light py-3">
        <p>&copy; 2024 Eden's Pharm. All Rights Reserved.</p>
    </footer>

    <!-- Local JavaScript files -->
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

</body>

</html>
