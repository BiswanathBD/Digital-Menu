const categoryContainer = document.getElementById("category-container");
const foodContainer = document.getElementById("food-container");
const cartContainer = document.getElementById("cart-container");
let cart = [];

const loadCategory = async () => {
  try {
    const res = await fetch(
      "https://taxi-kitchen-api.vercel.app/api/v1/categories"
    );
    const data = await res.json();
    const categoryData = data.categories;

    categoryContainer.innerHTML = "";
    categoryData.forEach((category) => {
      categoryContainer.innerHTML += `
      <div id="${category.id}"  onclick="showCategoryData(${category.id})" class="group flex justify-between items-center gap-2 bg-gradient-to-l from-yellow-600 p-1 rounded-r-full">
              <p class="font-semibold text-lg text-white ml-4 group-hover:ml-5 group-hover:text-xl transition-all">${category.categoryName}</p>
              <img src=${category.categoryImg} alt="" class="p-1 bg-white rounded-full w-10 aspect-square object-cover">
            </div>
      `;
    });
  } catch (error) {
    categoryContainer.innerHTML = `
    <div class="w-full text-center text-red-800 text-2xl my-10">
    <i class="fa-solid fa-bug"></i>
    <p class="text-lg text-neutral-400 ">Category Load Fail</p>
    </div>
    `;
  }
};
loadCategory();

const showCategoryData = async (id) => {
  try {
    const url = id
      ? ` https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`
      : " https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
    const res = await fetch(url);
    const data = await res.json();
    const foodsData = data.foods;
    foodContainer.innerHTML = "";

    foodsData.forEach((food) => {
      foodContainer.innerHTML += `
      <div class="bg-yellow-600/40 border backdrop-blur-sm p-2 rounded-xl mt-4">
              <div class="flex items-center gap-4">
                <img onclick="showDetails(${food.id})" src=${food.foodImg} alt="" class="w-32 aspect-square object-cover bg-white rounded-lg p-1" />

                <div class="w-full">
                  <h3 class="text-3xl font-semibold text-white">${food.title}</h3>
                  <p class="text-xs bg-yellow-600/20 px-2 p-1 rounded-full w-fit text-white">${food.category}</p>
                  <div class="flex justify-between items-center">
                    <hr class="flex-grow"> </p> <h2 class="text-xl font-semibold text-white mx-4"><span id-"price">${food.price}</span> BDT</h2>
                  </div>
                  <button onclick="addCart(${food.id})" class="mt-1 px-3 py-1 bg-white text-yellow-800 rounded-md font-semibold mx-4">
              <i class="fa-solid fa-square-plus"></i> Add to cart</button>
                </div>
              </div>
            </div>
    `;
    });
  } catch (error) {}
};
showCategoryData();

// const showDetails = (id) => {
//   console.log(id);
// };

const updateCart = () => {
  cart.forEach((item) => {
    console.log(item);
    cartContainer.innerHTML += `
    <div class="bg-yellow-600 flex justify-between items-center">
              <div class="flex items-center gap-4">
                <img src=${item.foodImg} alt="" class="w-16 aspect-square object-cover bg-white border border-white">
              <div>
                <h4 class="text-white text-xl font-semibold mb-1">${item.title}</h4>
                <p class="font-semibold text-xs text-black"><span>${item.price}</span> BDT</p>
              </div>
            </div>
            <i onclick="removeItem(${item.id})" class="fa-regular fa-trash-can text-red-500 text-xl mr-4"></i>
              </div>
    `;
  });
};

const addCart = async (id) => {
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const newCartItem = data.details;
  cart = [...cart, newCartItem];
  cartContainer.innerHTML = "";
  updateCart();
};
const removeItem = (id) => {
  console.log(id);
  const index = cart.findIndex((item) => item.id === id);

  if (index !== -1) {
    cart.splice(index, 1);
  }
  cartContainer.innerHTML = "";
  updateCart();
};
