import '../styles/Home.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import {HomeRoute} from '../utils/API';