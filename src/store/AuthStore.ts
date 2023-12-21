import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import { AuthResponse } from '../models/response/AuthResponse';
import $api, { API_URL } from '../http';

export default class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  isAuth: boolean = false;

  isLoading: boolean = false

  setIsAuth(data: boolean): void {
    this.isAuth = data;
  }

  get getIsAuth(): boolean {
    return this.isAuth;
  }


  async login(email: string, username: string, password: string) {
    try {
      await AuthService.login(email, username, password)      
    } catch(e) {
      console.log(e);
    }
  }

  async register(email: string, username: string, password: string) {
    try {
      await AuthService.register(email, username, password)
    } catch(e) {
      console.log(e);
    }
  }

  async confirm(id: string) {
    try {
      const response = await AuthService.confirmAuth(id)
      localStorage.setItem('accessToken', response.data.accessToken) 
      localStorage.setItem('refreshToken', response.data.refreshToken) 
      console.log(response.data);
      this.setIsAuth(true)     
    } catch(e) {
      console.log(e)
    }
  }

  async checkAuth() {
    try {
      this.isLoading = true
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await $api.post<AuthResponse>(`${API_URL}auth/access-token`, {refreshToken})
      localStorage.setItem('accessToken', response.data.accessToken) 
      localStorage.setItem('refreshToken', response.data.refreshToken) 
      this.setIsAuth(true)    
    } catch(e) {
      console.log(e);
    } finally {
      this.isLoading = false
    }
  }
}
