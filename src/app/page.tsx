export default function Home(){
  // await testGraphQlauth();
  return (
    <div>
      <section className="flex-start flex-col paddings mb-16">
        <h1>Categories</h1>
        <h1>Posts</h1>
        <h1>Load More</h1>
      </section>
    </div>
  )
}

// async function testGraphQlauth(){

//   try{
//   const query = `
//     mutation UserUpdate($email: String!, $input: UserUpdateInput!){
//       userUpdate(by: {email: $email}, input: $input) {
//         user {
//           id
//           email
//           name
//         }
//       }
//     }
//   `

//   const res = await makeGraphQLRequest(query,{input: {name: "Manraj Singh"},email: "manrajs.2712@gmail.com"});
//   console.log(res);
// }catch(e){
//   console.log(e);
// }

// }