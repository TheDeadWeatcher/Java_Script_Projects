class InfiniteScroll {
  constructor(container, loader) {
    this.container = container;
    this.loader = loader;
    this.loading = false;
    this.page = 1;
    this.init();
  }
  init() {
    window.onload = this.getData;

    window.addEventListener("scroll", () => {
      if(this.loading) return;
      
      if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
        this.setLoading(true);
        this.getData();
      }
    });
  }

  setLoading(flag){
    if (flag){
        this.loader.classList.remove("hidden");
    } else {
      this.loader.classList.add("hidden");
    }

    this.loading = flag;
  }

  getData = async () => {
    console.log("getData");
    const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=10`;
    try {
      const res = await fetch(apiUrl);
      const photosArray = await res.json();
      this.displayPosts(photosArray);
    } catch (err) {
      console.log(err);
    }
    this.page++;
    this.setLoading(false);
  };

  displayPosts(posts) {
    this.container.innerHTML += posts
      .map((post) => {
        return `
        <div class="post">
            <h3>${this.capFirstLetter(post.title)}</h3>
            <p>${this.capFirstLetter(post.body)}</p>
        </div>
      `;
      })
      .join("");
  }

  capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

const iScroll = new InfiniteScroll(
  document.querySelector(".container"),
  document.querySelector(".loader")
);
