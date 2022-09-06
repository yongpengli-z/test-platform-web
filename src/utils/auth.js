import Cookies from 'js-cookie'

const TokenKey = 'User_token'
const UserAvatar= 'User_avatar'
const UserName = 'User_name'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export  function getAvatar(){
  return Cookies.get(UserAvatar)
}

export function setAvatar(avatar){
  return Cookies.set(UserAvatar,avatar)
}

export function removeAvatar(){
  return Cookies.remove(UserAvatar)
}

export function getName(){
  return Cookies.get(UserName)
}

export function setName(name){
  return  Cookies.set(UserName,name)
}

export function removeName(){
  return Cookies.remove(UserName)
}
