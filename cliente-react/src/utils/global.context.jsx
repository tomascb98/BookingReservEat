import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([])
  const [cities, setCities] = useState([])
  const [users, setUsers] = useState([])
  const [rules, setRules] = useState([])
  const [policies, setPolicies] = useState([])
  const [roles, setRoles] = useState([])
  const [featureIds, setFeatureIds] = useState([])
  const [rating, setRating] = useState(0);
  const [horarioReserva, setHorarioReserva] = useState(new Date(dayjs()))



  useEffect(() => {

    //!----------------------

    async function fetchDataFeatures() {
      try {
        const response = await fetch("http://18.222.87.247:8080/Features/all");
        const info = await response.json();
        setFeatureIds(info);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    }
    fetchDataFeatures();

    //!---------------------- 

    async function fetchDataCities() {
      try {
        const response = await fetch('http://18.222.87.247:8080/Cities');
        const info = await response.json();
        setCities(info);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }
    fetchDataCities();

    async function fetchDataCategories() {
      try {
        const response = await fetch('http://18.222.87.247:8080/Categories');
        const info = await response.json();
        setCategories(info);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchDataCategories();

    async function fetchDataRestaurants() {
      try {
        const response = await fetch('http://18.222.87.247:8080/Restaurants');
        const info = await response.json();
        setRestaurants(info);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    }
    fetchDataRestaurants();

    async function fetchDataUsers() {
      try {
        const response = await fetch('http://18.222.87.247:8080/users/all');
        const info = await response.json();
        setUsers(info);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchDataUsers();

    async function fetchDataRules() {
      try {
        const response = await fetch('http://18.222.87.247:8080/Rules');
        const info = await response.json();
        setRules(info);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    }
    fetchDataRules();

    async function fetchDataPolicies() {
      try {
        const response = await fetch('http://18.222.87.247:8080/Policies');
        const info = await response.json();
        setPolicies(info);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    }
    fetchDataPolicies();

    async function fetchDataRoles() {
      try {
        const response = await fetch('http://18.222.87.247:8080/users/role/all');
        const info = await response.json();
        setRoles(info);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    }
    fetchDataRoles();
  }, []);



  return (
    <ContextGlobal.Provider
      value={{ restaurants, setRestaurants, categories, setCategories, cities, setCities, users, setUsers, rules, policies, roles, featureIds, setFeatureIds, horarioReserva, setHorarioReserva, rating, setRating, setPolicies, setRules }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useContextGlobal = () => useContext(ContextGlobal);
