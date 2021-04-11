package main

import (
	"tic_tac_toe/server"
)

func main() {
	server := server.Init()
	server.HandleRoutes()
}
