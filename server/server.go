package server

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

/*
*	Server - структура сервера
* */
type Server struct {
	port   string
	router *http.ServeMux
}

/*
*	Start - функция инициализирует конфиг сервера
* */
func Init() *Server {
	s := &Server{
		port:   ":8080", // TODO пока что хардкод
		router: http.NewServeMux(),
	}

	return s
}

/*
*	HandleRoutes - навешивает обработчики
* */
func (s *Server) HandleRoutes() {
	fmt.Printf("Server start on port: %s\n", s.port)

	fileServer := http.FileServer(http.Dir("./public/"))
	s.router.Handle("/public/", http.StripPrefix("/public", fileServer))
	s.router.HandleFunc("/", s.handleIndex())

	log.Fatal(http.ListenAndServe(s.port, s.router))
}

/*
*	handleIndex - метод возвращает пользователю интерфейс
* */
func (s *Server) handleIndex() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		gui, err := template.ParseFiles("index.html")
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err = gui.ExecuteTemplate(w, "index", nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
	}
}
