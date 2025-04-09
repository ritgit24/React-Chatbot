// // // // // package main

// // // // // import (
// // // // // 	"chatbot-backend/database"
// // // // // 	"chatbot-backend/handlers"
// // // // // 	"github.com/gin-gonic/gin"
// // // // // 	"github.com/joho/godotenv"
// // // // // )

// // // // // func main() {
// // // // // 	godotenv.Load()
// // // // // 	database.InitDB()

// // // // // 	r := gin.Default()
// // // // // 	r.POST("/signup", handlers.Signup)
// // // // // 	r.POST("/login", handlers.Login)
// // // // // 	r.POST("/chat", handlers.Chat)

// // // // // 	r.Run(":8080")
// // // // // }
// // // // package main

// // // // import (
// // // // 	"chatbot-backend/database"
// // // // 	"chatbot-backend/handlers"
// // // // 	"chatbot-backend/models"
// // // // 	"github.com/gin-gonic/gin"
// // // // 	"github.com/joho/godotenv"
// // // // 	"net/http"
// // // // )

// // // // func main() {
// // // // 	// Load environment variables
// // // // 	godotenv.Load()

// // // // 	// Initialize the database
// // // // 	database.InitDB()

// // // // 	// Set up the Gin router
// // // // 	r := gin.Default()

// // // // 	// Define routes
// // // // 	r.POST("/signup", handlers.Signup)
// // // // 	r.POST("/login", handlers.Login)
// // // // 	r.POST("/chat", handlers.Chat)
// // // // 	r.GET("/users", getAllUsers) // New endpoint to fetch all users

// // // // 	// Start the server
// // // // 	r.Run(":8080")
// // // // }

// // // // // getAllUsers fetches all users from the database
// // // // func getAllUsers(c *gin.Context) {
// // // // 	users, err := models.GetAllUsers(database.DB)
// // // // 	if err != nil {
// // // // 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
// // // // 		return
// // // // 	}
// // // // 	c.JSON(http.StatusOK, gin.H{"users": users})
// // // // }
// // // package main

// // // import (
// // // 	"chatbot-backend/database"
// // // 	"chatbot-backend/handlers"
// // // 	"github.com/gin-gonic/gin"
// // // 	"github.com/joho/godotenv"
// // // )

// // // func main() {
// // // 	// Load environment variables
// // // 	godotenv.Load()

// // // 	// Initialize the database
// // // 	database.InitDB()

// // // 	// Set up the Gin router
// // // 	r := gin.Default()

// // // 	// Define routes
// // // 	r.POST("/signup", handlers.Signup)
// // // 	r.POST("/login", handlers.Login)
// // // 	r.POST("/chat", handlers.Chat)

// // // 	// Start the server
// // // 	r.Run(":8080")
// // // }
// // package main

// // import (
// // 	"chatbot-backend/database"
// // 	"chatbot-backend/handlers"
// // 	"github.com/gin-gonic/gin"
// // 	"github.com/joho/godotenv"
// // 	"log"
// // )

// // func main() {
// // 	// Load environment variables
	
// // 	err := godotenv.Load()
// // 	if err != nil {
// // 		log.Fatal("Error loading .env file")
// // 	}


// // 	// Initialize the database
// // 	database.InitDB()

// // 	// Set up the Gin router
// // 	r := gin.Default()

// // 	// Add CORS middleware
// // 	// r.Use(func(c *gin.Context) {
// // 	// 	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
// // 	// 	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
// // 	// 	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
// // 	// 	if c.Request.Method == "OPTIONS" {
// // 	// 		c.AbortWithStatus(204) // No content for preflight requests
// // 	// 		return
// // 	// 	}
// // 	// 	c.Next()
// // 	// })
// // 	r.Use(func(c *gin.Context) {
// // 		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5181") // Allow requests from React frontend
// // 		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
// // 		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
// // 		if c.Request.Method == "OPTIONS" {
// // 			c.AbortWithStatus(204) // No content for preflight requests
// // 			return
// // 		}
// // 		c.Next()
// // 	})
// // 	// Define routes
// // 	r.POST("/signup", handlers.Signup)
// // 	r.POST("/login", handlers.Login)
// // 	r.POST("/chat", handlers.Chat)

// // 	// Start the server
// // 	r.Run(":8080")
// // }
// package main

// import (
// 	"chatbot-backend/database"
// 	"chatbot-backend/handlers"
// 	"github.com/gin-gonic/gin"
// 	"github.com/joho/godotenv"
	
// )

// func main() {
// 	// Load environment variables
// 	godotenv.Load()

// 	// Initialize the database
// 	database.InitDB()

// 	// Set up the Gin router
// 	r := gin.Default()

// 	// Add CORS middleware
// 	r.Use(func(c *gin.Context) {
// 		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5181") // Allow requests from React frontend
// 		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
// 		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
// 		if c.Request.Method == "OPTIONS" {
// 			c.AbortWithStatus(204) // No content for preflight requests
// 			return
// 		}
// 		c.Next()
// 	})

// 	// Define routes
// 	r.POST("/signup", handlers.Signup)
// 	r.POST("/login", handlers.Login)
// 	r.POST("/chat", handlers.GettingQueriesAnswer(database.DB, "your_session_secret_key", "your_groq_api_key")) // Add this route

// 	// Start the server
// 	r.Run(":8080")
// }
package main

import (
	"chatbot-backend/database"
	"chatbot-backend/handlers"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Loading environment variables
	godotenv.Load()

	// Initialing the database
	database.InitDB()

	// set up the Gin router.The Gin router is a popular HTTP web framework for  Go.When we want a router with the default middleware (Logger and Recovery), we use gin.Default
	r := gin.Default()

	// to add CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173") // Allow requests from React frontend
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204) // No content for preflight requests
			return
		}
		c.Next()
	})

	// Define routes
	r.POST("/signup", handlers.Signup)
	r.POST("/login", handlers.Login)
	r.POST("/chat", handlers.GettingQueriesAnswer(database.DB, "your_session_secret_key", "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"))

	// to Start the server
	r.Run(":8080")
}