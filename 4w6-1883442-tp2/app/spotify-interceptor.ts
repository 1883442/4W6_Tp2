import axios from "axios";

// La variable spotifyRequest va nous servir dans d'autres fichiers !
export const spotifyRequest = axios.create();

spotifyRequest.interceptors.request.use((config) => {

  // À chaque fois qu'une requête est envoyée, on modifie le 
  // Content-Type et l'Authorization dans ses en-têtes
  config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");

  return config;

});