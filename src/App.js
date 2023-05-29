import React from 'react';
// import Child from './Child';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      posts: [],
      editPostId: null,
    }
  }

componentDidMount(){
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response)=> response.json())
    .then((data) => this.setState({posts: data}))
    .catch(error => console.error(error))
}

componentWillUnmount() {
  clearTimeout(this.time);
}

confirmPost= (post) =>{
  let confirm = window.confirm('Are you sure?')
    if(confirm){
      this.deletePost(post.id)
    }   
}

deletePost=(postId)=>{
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`,
  { method: 'DELETE'})
  .then((response) =>{
    if(response.status===200){
      const { posts } = this.state;
      const updatedPost = posts.filter((post)=>post.id!==postId);
      this.setState({posts: updatedPost});
      this.showNotification()
    } else{
      console.error('Error: ', response.status)
    }
  })
  .catch((error)=>console.error(error))
  
}

  editPost = (postId) => {
    this.setState({ editPostId: postId });
  }

  changeTitle = (event, postId) => {
    const { value } = event.target;
    this.setState(prevState => ({
      posts: prevState.posts.map(post => {
        if (post.id === postId) {
          return { ...post, title: value };
        }
        return post;   
      }) 
    }));
  }

  saveTitle = () => {
    this.setState({ editPostId: null});
    this.showNotification()
  }

  showNotification=()=>{
  let time= setTimeout(()=>{
      window.alert('Операция выполнена успешно')
    }, 2000)
  }

  render(){
  return (
    <>
    <div>
      <ol>
        {this.state.posts.map((post) =>
          <li key ={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            {this.state.editPostId === post.id ? (
                <div>
                  <input
                    type="text"
                    value={post.title}
                    onChange={event => this.changeTitle(event, post.id)}
                  />
                  <button onClick={() => this.saveTitle(post.id)}>Save</button>
                </div>) :(<></>)}
            <p></p>
            <button onClick={() => this.editPost(post.id)}>Edit</button>
           
            <button onClick={()=>this.confirmPost(post)}>Delete</button>
          </li>
          )}
      </ol>
    </div>
    </>
  );
  }
}

export default App;