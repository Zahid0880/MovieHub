document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'e978a596';
    const apiUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&';
    let movies = [];
    let currentPage = 1;
    let currentCategory = 'all';
    let currentYear = null;
    let currentSearchQuery = '';
    const moviesPerPage = 18;

    // Enhanced movie data with real movie poster images
    const moviesData = [
        { 
            id: 1, 
            title: "Avengers: Endgame", 
            downloadSize: "2.8GB - 1.9GB - 1.1GB", 
            category: "action", 
            subcategory: "hollywood", 
            year: 2019, 
            rating: 8.4,
            duration: "3 hr 1 minutes",
            language: "English",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "The grave course of events set in motion by Thanos that wiped out half the universe and fractured the Avengers ranks compels the remaining Avengers to take one final stand in Marvel Studios' grand conclusion to twenty-two films.",
            image: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
        },
        { 
            id: 2, 
            title: "RRR", 
            downloadSize: "3.2GB - 2.1GB - 1.3GB", 
            category: "action", 
            subcategory: "tollywood", 
            year: 2022, 
            rating: 7.9,
            duration: "3 hr 7 minutes",
            language: "Telugu - Hindi - English",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "A fearless revolutionary and an officer in the British force, who once shared a deep bond, decide to join forces and chart out an inspirational path of freedom against the despotic rulers.",
            image: "https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
        },
         { 
            id: 3, 
            title: "Spider-Man: No Way Home", 
            downloadSize: "2.9GB - 2.0GB - 1.2GB", 
            category: "action", 
            subcategory: "english", 
            year: 2021, 
            rating: 8.2,
            duration: "2 hr 28 minutes",
            language: "English",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
            image: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg"
        },
        { 
            id: 16, 
            title: "Doctor Strange in the Multiverse of Madness", 
            downloadSize: "2.5GB - 1.7GB - 1.0GB", 
            category: "action", 
            subcategory: "hollywood", 
            year: 2022, 
            rating: 6.9,
            duration: "2 hr 6 minutes",
            language: "English",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself.",
            image: "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_SX300.jpg"
        },

         { 
            id: 20, 
            title: "John Wick: Chapter 4", 
            downloadSize: "2.7GB - 1.8GB - 1.0GB", 
            category: "action-movies", 
            subcategory: "hollywood", 
            year: 2023, 
            rating: 7.7,
            duration: "2 hr 49 minutes",
            language: "English",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.",
            image: "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg"
        },
        
        {
    "id": 6,
    "title": "Pushpa: The Rise",
    "downloadSize": "2.4GB - 1.6GB - 950MB",
    "category": "action",
    "subcategory": "tollywood",
    "year": 2021,
    "rating": 7.6,
    "duration": "2 hr 59 minutes",
    "language": "Telugu - Hindi",
    "format": "MKV",
    "quality": "WEB-DL 1080p - 720p - 480p",
    "description": "A laborer named Pushpa makes enemies as he rises in the world of red sandalwood smuggling. However, violence erupts when the police attempt to bring down his illegal business.",
    "image": "https://m.media-amazon.com/images/M/MV5BNGZlNTFlOWMtMzE3Yy00NGExLWJhZGYtMDc5NDE2NzQxNGZmXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg"
},
        { 
            id: 7, 
            title: "Chal Mera Putt 3", 
            downloadSize: "1.8GB - 1.2GB - 700MB", 
            category: "comedy", 
            subcategory: "punjabi", 
            year: 2023, 
            rating: 7.9,
            duration: "2 hr 15 minutes",
            language: "Punjabi",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "The story of immigrants who went abroad for better opportunities but face challenges. A heartwarming tale of friendship, struggle, and the pursuit of dreams in a foreign land.",
            image: "https://m.media-amazon.com/images/M/MV5BNjE3NDI2MTctNWFlNy00NzRlLWE0YjQtMzQyNDQwMzExMTg2XkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg"
        },
        { 
            id: 8, 
            title: "Carry On Jatta 3", 
            downloadSize: "1.9GB - 1.3GB - 800MB", 
            category: "comedy", 
            subcategory: "punjabi", 
            year: 2023, 
            rating: 8.1,
            duration: "2 hr 18 minutes",
            language: "Punjabi",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "A comedy of errors that follows the misadventures of a group of friends. Packed with humor, confusion, and entertainment that will keep you laughing throughout.",
            image: "https://m.media-amazon.com/images/M/MV5BNzg3NjQyODYtMWVlOS00YzI0LTk1YjMtOGY4ZGI2ZGFmYzgyXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg"
        },
        { 
            id: 9, 
            title: "Top Gun: Maverick", 
            downloadSize: "2.7GB - 1.8GB - 1.0GB", 
            category: "action", 
            subcategory: "english", 
            year: 2022, 
            rating: 8.3,
            duration: "2 hr 10 minutes",
            language: "English",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice.",
            image: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg"
        },
       
        { 
            id: 11, 
            title: "Vikram", 
            downloadSize: "2.2GB - 1.5GB - 900MB", 
            category: "action", 
            subcategory: "tamil", 
            year: 2022, 
            rating: 8.2,
            duration: "2 hr 54 minutes",
            language: "Tamil - Hindi",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "Members of a black ops team must track and eliminate a gang of masked murderers. A special investigator discovers a connection between the masked killers and a drug kingpin.",
            image: "https://m.media-amazon.com/images/M/MV5BMmJhYTYxMGEtNjQ5NS00MWZiLWEwN2ItYjJmMWE2YTU1YWYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg"
        },
        { 
            id: 12, 
            title: "Beast", 
            downloadSize: "2.0GB - 1.3GB - 800MB", 
            category: "action", 
            subcategory: "tamil", 
            year: 2022, 
            rating: 5.7,
            duration: "2 hr 35 minutes",
            language: "Tamil - Hindi",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "A jaded former intelligence agent is pulled back into action when an attack at a mall where he's shopping threatens the lives of innocent people, including a young girl.",
            image: "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3YjVjODcxODJjXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg"
        },
        { 
            id: 13, 
            title: "KGF Chapter 2", 
            downloadSize: "2.6GB - 1.8GB - 1.0GB", 
            category: "action", 
            subcategory: "bollywood", 
            year: 2022, 
            rating: 8.3,
            duration: "2 hr 48 minutes",
            language: "Kannada - Hindi",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes, while the government sees him as a threat to law and order. Rocky must battle threats from all sides for unchallenged supremacy.",
            image: "https://m.media-amazon.com/images/M/MV5BMTU2NzAzOTU1M15BMl5BanBnXkFtZTgwODMwMTQ4OTM@._V1_SX300.jpg"
        },
        { 
            id: 14, 
            title: "Brahmastra", 
            downloadSize: "2.8GB - 1.9GB - 1.1GB", 
            category: "fantasy", 
            subcategory: "bollywood", 
            year: 2022, 
            rating: 5.6,
            duration: "2 hr 47 minutes",
            language: "Hindi - English",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "A DJ with superpowers and his ladylove embark on a mission to protect the Brahmastra, a weapon of enormous energy, from dark forces closing in on them.",
            image: "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3YjVjODcxODJjXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg"
        },
        { 
            id: 15, 
            title: "The Batman", 
            downloadSize: "3.1GB - 2.1GB - 1.2GB", 
            category: "action", 
            subcategory: "hollywood", 
            year: 2022, 
            rating: 7.8,
            duration: "2 hr 56 minutes",
            language: "English",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
            image: "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg"
        },
        
        { 
            id: 17, 
            title: "Thunivu", 
            downloadSize: "2.1GB - 1.4GB - 850MB", 
            category: "action", 
            subcategory: "tamil", 
            year: 2023, 
            rating: 6.1,
            duration: "2 hr 26 minutes",
            language: "Tamil - Hindi",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "A mysterious mastermind - Daredevil and his team forms a plan and commits bank heist to find the corporate looted people's money.",
            image: "https://m.media-amazon.com/images/M/MV5BNjE3NDI2MTctNWFlNy00NzRlLWE0YjQtMzQyNDQwMzExMTg2XkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg"
        },
        { 
            id: 18, 
            title: "Varisu", 
            downloadSize: "2.0GB - 1.3GB - 800MB", 
            category: "drama", 
            subcategory: "tamil", 
            year: 2023, 
            rating: 6.0,
            duration: "2 hr 49 minutes",
            language: "Tamil - Hindi",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "Vijay, a typical middle-class guy, finds his life ruined when a masked man kidnaps his family and forces him to become an unwilling assassin, targeting the people responsible for his father's death.",
            image: "https://m.media-amazon.com/images/M/MV5BNzg3NjQyODYtMWVlOS00YzI0LTk1YjMtOGY4ZGI2ZGFmYzgyXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg"
        },
        { 
            id: 19, 
            title: "Bholaa", 
            downloadSize: "2.2GB - 1.5GB - 900MB", 
            category: "action", 
            subcategory: "bollywood", 
            year: 2023, 
            rating: 6.6,
            duration: "2 hr 24 minutes",
            language: "Hindi",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "An ex-convict must undertake a perilous journey to save a policewoman and her team from a drug lord, while also trying to reunite with his daughter after 10 years.",
            image: "https://m.media-amazon.com/images/M/MV5BNzg3NjQyODYtMWVlOS00YzI0LTk1YjMtOGY4ZGI2ZGFmYzgyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg"
        },
        { 
            id: 20, 
            title: "John Wick: Chapter 4", 
            downloadSize: "2.7GB - 1.8GB - 1.0GB", 
            category: "action-movies", 
            subcategory: "hollywood", 
            year: 2023, 
            rating: 7.7,
            duration: "2 hr 49 minutes",
            language: "English",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.",
            image: "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg"
        },
        { 
            id: 21, 
            title: "Scream VI", 
            downloadSize: "2.1GB - 1.4GB - 850MB", 
            category: "horror", 
            subcategory: "english", 
            year: 2023, 
            rating: 6.5,
            duration: "2 hr 3 minutes",
            language: "English",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter in New York City.",
            image: "https://m.media-amazon.com/images/M/MV5BYmZhZDFhMjktYWExMC00YWQzLTk0YjItOTI4MDY3MDU3MWExXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg"
        },
        { 
            id: 22, 
            title: "Creed III", 
            downloadSize: "2.3GB - 1.6GB - 950MB", 
            category: "drama", 
            subcategory: "english", 
            year: 2023, 
            rating: 6.8,
            duration: "1 hr 56 minutes",
            language: "English",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "Adonis has been thriving in both his career and family life, but when a childhood friend and former boxing prodigy resurfaces, the face-off is more than just a fight.",
            image: "https://m.media-amazon.com/images/M/MV5BNjE1NzA5ZDQtYTliOS00MzFjLWJiYTMtOWQ4ZDg3YTM0MjkzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
        },
        { 
            id: 23, 
            title: "Sher Bagga", 
            downloadSize: "1.7GB - 1.1GB - 650MB", 
            category: "comedy", 
            subcategory: "punjabi", 
            year: 2022, 
            rating: 7.2,
            duration: "2 hr 21 minutes",
            language: "Punjabi",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "A romantic comedy about a man who pretends to be married to impress a girl, but his lies lead to hilarious complications.",
            image: "https://m.media-amazon.com/images/M/MV5BNjE3NDI2MTctNWFlNy00NzRlLWE0YjQtMzQyNDQwMzExMTg2XkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg"
        },
        { 
            id: 24, 
            title: "Kisi Ka Bhai Kisi Ki Jaan", 
            downloadSize: "2.4GB - 1.6GB - 950MB", 
            category: "action", 
            subcategory: "bollywood", 
            year: 2023, 
            rating: 5.6,
            duration: "2 hr 24 minutes",
            language: "Hindi",
            format: "MKV",
            quality: "WEB-DL 1080p - 720p - 480p",
            description: "The eldest brother refuses to marry since he believes it may create disharmony in his big family. His brothers, who've already found partners, come together to find a match for him.",
            image: "https://images.app.goo.gl/VMzWV9q8xH1SAgxAAhttps://images.app.goo.gl/2YhsNcz22teXg5sb8"
        }
    ];

    // DOM elements
    const moviesGrid = document.getElementById('moviesGrid');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const categoryLinks = document.querySelectorAll('.category-link');
    const pageNumbers = document.querySelectorAll('.page-number');
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Page elements
    const homePage = document.getElementById('homePage');
    const aboutPage = document.getElementById('aboutPage');
    const categoryPage = document.getElementById('categoryPage');
    const yearPage = document.getElementById('yearPage');
    const movieDetailsPage = document.getElementById('movieDetailsPage');

    // Movie details elements
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    const movieDetailsPoster = document.getElementById('movieDetailsPoster');
    const movieDetailsTitle = document.getElementById('movieDetailsTitle');
    const movieRating = document.getElementById('movieRating');
    const movieYear = document.getElementById('movieYear');
    const movieCategory = document.getElementById('movieCategory');
    const movieLanguage = document.getElementById('movieLanguage');
    const movieDuration = document.getElementById('movieDuration');
    const movieSize = document.getElementById('movieSize');
    const movieFormat = document.getElementById('movieFormat');
    const movieQuality = document.getElementById('movieQuality');
    const movieDescription = document.getElementById('movieDescription');
    const relatedMoviesGrid = document.getElementById('relatedMoviesGrid');
    const watchOnlineBtn = document.getElementById('watchOnlineBtn');

    // Initial setup
    showPage('homePage');
    setupEventListeners();
    renderMovies();

    // Function to show a specific page
    function showPage(pageId) {
        // Hide all pages
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => page.style.display = 'none');
        
        // Show selected page
        document.getElementById(pageId).style.display = 'block';
        
        // Update nav links
        navLinks.forEach(link => link.classList.remove('active'));
        const targetLink = document.querySelector(`[data-page="${pageId.replace('Page', '')}"]`);
        if (targetLink) targetLink.classList.add('active');
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Function to fetch movies from the API
    async function fetchMovies(searchTerm = 'movie', page = 1) {
        try {
            let url = apiUrl + `s=${searchTerm}&page=${page}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.Search) {
                return data.Search;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            return [];
        }
    }

    // Function to render movies on the page
    async function renderMovies() {
        let filteredMovies = await getFilteredMovies();
        moviesGrid.innerHTML = '';

        if (filteredMovies.length === 0) {
            moviesGrid.innerHTML = '<div class="no-movies"><p>No movies found matching your criteria.</p></div>';
            updatePagination(0);
            return;
        }

        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const moviesToDisplay = filteredMovies.slice(startIndex, endIndex);

        moviesToDisplay.forEach(movie => {
            const movieCard = createMovieCard(movie);
            moviesGrid.appendChild(movieCard);
        });

        updatePagination(filteredMovies.length);
    }

    // Function to create a movie card
    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.onclick = () => handleMovieClick(movie);

        card.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.image}" alt="${movie.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-download">Download - ${movie.downloadSize.split(' - ')[0]}</p>
            </div>
        `;

        return card;
    }

    // Function to get filtered movies based on current filters
    async function getFilteredMovies() {
        let filtered = moviesData;

        // Filter by category/subcategory
        if (currentCategory !== 'all') {
            switch(currentCategory) {
                case 'action':
                    filtered = filtered.filter(movie => movie.category === 'action');
                    break;
                case 'action-movies':
                    filtered = filtered.filter(movie => movie.category === 'action-movies' || movie.category === 'action');
                    break;
                case 'bollywood':
                    filtered = filtered.filter(movie => movie.subcategory === 'bollywood');
                    break;
                case 'hollywood':
                    filtered = filtered.filter(movie => movie.subcategory === 'hollywood');
                    break;
                case 'tollywood':
                    filtered = filtered.filter(movie => movie.subcategory === 'tollywood');
                    break;
                case 'punjabi':
                    filtered = filtered.filter(movie => movie.subcategory === 'punjabi');
                    break;
                case 'english':
                    filtered = filtered.filter(movie => movie.subcategory === 'english');
                    break;
                case 'tamil':
                    filtered = filtered.filter(movie => movie.subcategory === 'tamil');
                    break;
                default:
                    filtered = filtered.filter(movie => movie.category === currentCategory);
            }
        }

        // Filter by year
        if (currentYear) {
            if (currentYear === '2010-2014') {
                filtered = filtered.filter(movie => movie.year >= 2010 && movie.year <= 2014);
            } else if (currentYear === '2000-2009') {
                filtered = filtered.filter(movie => movie.year >= 2000 && movie.year <= 2009);
            } else {
                filtered = filtered.filter(movie => movie.year == currentYear);
            }
        }

        // Filter by search query
        if (currentSearchQuery) {
            filtered = filtered.filter(movie => 
                movie.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
                movie.subcategory.toLowerCase().includes(currentSearchQuery.toLowerCase())
            );
        }

        return filtered;
    }

    // Function to render pagination controls
    function updatePagination(totalMovies) {
        const totalPages = Math.ceil(totalMovies / moviesPerPage);

        // Update page number buttons
        pageNumbers.forEach(btn => {
            const page = parseInt(btn.dataset.page);
            btn.classList.toggle('active', page === currentPage);
            btn.style.display = page <= totalPages ? 'inline-block' : 'none';
        });

        // Update back/next buttons
        if (backBtn) backBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage >= totalPages || totalPages === 0;
    }

    // Function to fetch movie details by ID
    async function getMovieDetails(imdbID) {
        try {
            const url = apiUrl + `i=${imdbID}&plot=full`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    }

    // Function to show movie details on the page
    async function showMovieDetailsById(imdbID) {
        const movie = await getMovieDetails(imdbID);
        showMovieDetails(movie);
    }

    function showMovieDetails(movie) {
        if (!movie) {
            movieDetailsPage.innerHTML = '<p>Movie details not found.</p>';
            showPage('movieDetailsPage');
            return;
        }

        movieDetailsPage.innerHTML = `
            <div class="movie-details-container">
                <img src="${movie.image === 'N/A' ? 'placeholder.jpg' : movie.image}" alt="${movie.title}">
                <div class="movie-details-text">
                    <h2>${movie.title}</h2>
                    <p><strong>Year:</strong> ${movie.year}</p>
                    <p><strong>Director:</strong> ${movie.Director}</p>
                    <p><strong>Actors:</strong> ${movie.Actors}</p>
                    <p><strong>Plot:</strong> ${movie.Plot}</p>
                    <p><strong>Genre:</strong> ${movie.Genre}</p>
                    <p><strong>Rating:</strong> ${movie.imdbRating}</p>
                    <button class="back-button">Back to Home</button>
                </div>
            </div>
        `;

        movieDetailsPage.querySelector('.back-button').addEventListener('click', function() {
            showPage('homePage');
        });

        showPage('movieDetailsPage');
        scrollToTop();
    }

    // Function to set up event listeners
    function setupEventListeners() {
        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.dataset.page;
                showPage(page + 'Page');
            });
        });

        // Brand logo click - go to home
        document.querySelector('.nav-brand h1').addEventListener('click', function() {
            showPage('homePage');
            resetFilters();
            renderMovies();
        });

        // Search functionality
        if (searchBtn) {
            searchBtn.addEventListener('click', handleSearch);
        }
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            });
        }

        // Category filtering
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                categoryLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Update current category
                currentCategory = this.dataset.category;
                currentPage = 1;
                currentYear = null; // Reset year filter
                
                // Show home page and render movies
                showPage('homePage');
                renderMovies();
                updatePageTitle();
            });
        });

        // Category page - category card clicks
        document.addEventListener('click', function(e) {
            if (e.target.closest('.category-card')) {
                const categoryCard = e.target.closest('.category-card');
                const category = categoryCard.dataset.category;
                
                if (category) {
                    // Set category filter
                    currentCategory = category;
                    currentPage = 1;
                    currentYear = null;
                    
                    // Update active category link
                    categoryLinks.forEach(l => l.classList.remove('active'));
                    const categoryLink = document.querySelector(`[data-category="${category}"]`);
                    if (categoryLink) categoryLink.classList.add('active');
                    
                    // Show home page and render movies
                    showPage('homePage');
                    renderMovies();
                    updatePageTitle();
                }
            }
        });

        // Year page - year card clicks
        document.addEventListener('click', function(e) {
            if (e.target.closest('.year-card')) {
                const yearCard = e.target.closest('.year-card');
                const year = yearCard.dataset.year;
                
                if (year) {
                    // Set year filter
                    currentYear = parseInt(year);
                    currentPage = 1;
                    currentCategory = 'all';
                    
                    // Update active category link
                    categoryLinks.forEach(l => l.classList.remove('active'));
                    const allCategoryLink = document.querySelector('[data-category="all"]');
                    if (allCategoryLink) allCategoryLink.classList.add('active');
                    
                    // Show home page and render movies
                    showPage('homePage');
                    renderMovies();
                    updatePageTitle();
                }
            }
        });

        // Pagination
        if (pageNumbers) {
            pageNumbers.forEach(btn => {
                btn.addEventListener('click', function() {
                    currentPage = parseInt(this.dataset.page);
                    renderMovies();
                    scrollToTop();
                });
            });
        }

        if (backBtn) {
            backBtn.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    renderMovies();
                    scrollToTop();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                const totalMovies = getFilteredMovies().length;
                const totalPages = Math.ceil(totalMovies / moviesPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    renderMovies();
                    scrollToTop();
                }
            });
        }

        // Mobile menu toggle
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Genre tag clicks
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('genre-tag')) {
                const genre = e.target.textContent.toLowerCase();
                
                // Map genre to category
                const genreMap = {
                    'action': 'action',
                    'comedy': 'comedy',
                    'drama': 'drama',
                    'romance': 'romance',
                    'thriller': 'thriller',
                    'horror': 'horror',
                    'sci-fi': 'sci-fi',
                    'adventure': 'adventure',
                    'animation': 'animation',
                    'biography': 'biography',
                    'crime': 'crime',
                    'documentary': 'documentary',
                    'family': 'family',
                    'fantasy': 'fantasy',
                    'music': 'music',
                    'sport': 'sport',
                    'war': 'war',
                    'western': 'western'
                };
                
                const mappedCategory = genreMap[genre] || 'all';
                
                // Set category filter
                currentCategory = mappedCategory;
                currentPage = 1;
                currentYear = null;
                
                // Update active category link
                categoryLinks.forEach(l => l.classList.remove('active'));
                const categoryLink = document.querySelector(`[data-category="${mappedCategory}"]`);
                if (categoryLink) {
                    categoryLink.classList.add('active');
                } else {
                    const allCategoryLink = document.querySelector('[data-category="all"]');
                    if (allCategoryLink) allCategoryLink.classList.add('active');
                }
                
                // Show home page and render movies
                showPage('homePage');
                renderMovies();
                updatePageTitle();
            }
        });

        // Back to home button
        if (backToHomeBtn) {
            backToHomeBtn.addEventListener('click', function() {
                showPage('homePage');
            });
        }

        // Download button clicks
        document.addEventListener('click', function(e) {
            if (e.target.closest('.download-link-btn')) {
                const btn = e.target.closest('.download-link-btn');
                const quality = btn.dataset.quality;
                const server = btn.dataset.server;
                
                alert(`Starting download from Server ${server} in ${quality} quality...\n\nThis is a demo - no actual download will start.`);
            }
        });

        // Watch online button
        if (watchOnlineBtn) {
            watchOnlineBtn.addEventListener('click', function() {
                alert('Opening online player...\n\nThis is a demo - no actual player will open.');
            });
        }
    }

    // Reset all filters
    function resetFilters() {
        currentCategory = 'all';
        currentYear = null;
        currentSearchQuery = '';
        currentPage = 1;
        if (searchInput) searchInput.value = '';

        // Update active category
        categoryLinks.forEach(l => l.classList.remove('active'));
        const allCategoryLink = document.querySelector('[data-category="all"]');
        if (allCategoryLink) allCategoryLink.classList.add('active');
    }

    // Update page title based on current filter
    function updatePageTitle() {
        const titleMap = {
            'all': 'All Movies',
            'action': 'Action Movies',
            'action-movies': 'Action Movies',
            'bollywood': 'Bollywood Movies',
            'hollywood': 'Hollywood Movies',
            'tollywood': 'Tollywood Movies',
            'punjabi': 'Punjabi Movies',
            'english': 'English Movies',
            'tamil': 'Tamil Movies'
        };

        const title = titleMap[currentCategory] || 'Movies';
        document.title = `${title} - Movies Hub`;
    }

    // Handle search
    function handleSearch() {
        if (searchInput) {
            currentSearchQuery = searchInput.value.trim();
            currentPage = 1;
            renderMovies();
            scrollToTop();
        }
    }

    // Handle movie click (for backward compatibility)
    function handleMovieClick(movie) {
        showMovieDetails(movie);
    }

    // Utility function to scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Load related movies
    function loadRelatedMovies(movie) {
        const relatedMovies = moviesData.filter(m => 
            (m.category === movie.category || m.subcategory === movie.subcategory) && m.id !== movie.id
        ).slice(0, 6);
        
        relatedMoviesGrid.innerHTML = '';
        
        relatedMovies.forEach(m => {
            const movieCard = document.createElement('div');
            movieCard.className = 'related-movie-card';
            movieCard.innerHTML = `
                <div class="related-movie-poster">
                    <img src="${m.image}" alt="${m.title}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="related-movie-info">
                    <h4 class="related-movie-title">${m.title}</h4>
                    <p class="related-movie-year">${m.year}</p>
                </div>
            `;
            movieCard.addEventListener('click', () => showMovieDetails(m));
            relatedMoviesGrid.appendChild(movieCard);
        });
    }

    // Get category display name
    function getCategoryDisplayName(subcategory) {
        const categoryMap = {
            hollywood: 'Hollywood',
            bollywood: 'Bollywood',
            tollywood: 'Tollywood',
            punjabi: 'Punjabi',
            english: 'English',
            tamil: 'Tamil'
        };
        return categoryMap[subcategory] || subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        }
    });

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});