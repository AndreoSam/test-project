let api_url = ori_base_url + reg_endpoint
let navigate = useNavigate()
const [img, setImg] = useState()
const [data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
})

const handleChnage = (event) => {
    let { name, value } = event.target
    setData({ ...data, [name]: value })
}

const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit from', data);
    let formData = new FormData()
    formData.append('first_name', data.fname)
    formData.append('last_name', data.lname)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('profile_pic', img)

    axios.post(api_url, formData, {
        headers: {
            'Content-Type': 'application/form-data',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then((res) => {
            console.log('axios response for post', res.data);
            setData(res.data)
        })
        .catch((err) => console.log('axios error for post', err))
}

