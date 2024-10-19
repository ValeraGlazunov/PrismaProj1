import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function createOneCategory(){
    const category = await prisma.category.create({
        data: {
            name: 'Keyboards'
        }
    })
}

async function createOneProduct(){
    const product = await prisma.product.create({
        data: {
            name: 'Keyboard1',
            src: '',
            price: 5,
            categoryId: 1
        }
    })
}

async function findOneProduct(){
    const product = await prisma.product.findUnique({
        where: {
            id: 1
        }
    })
    const category = await prisma.category.findUnique({
        where: {
            id: product?.categoryId
        },

        include: {
            products: true
        }
    })
    console.log(category)
}

async function findOneCategory(){
    const category = await prisma.category.findUnique({
        where: {
            id: 1
        },

        include: {
            products: true
        }
    })
    console.log(category)
}



async function main() {
    
    const post = await prisma.post.create({
      data: {
        title: 'Перший пост',
        content: '',
      },
    })
  
    console.log('Post created:', post)
   

    const comment = await prisma.comment.create({
      data: {
        title: 'Перший коментар',
        body: '',
        postId: post.id,
      },
    })
  
    console.log('Comment created:', comment)
  
    
    const multipleComments = await prisma.comment.createMany({
      data: [
        {
          title: 'Другий коментар',
          body: '',
          postId: post.id,
        },
    ],
    })
  
    console.log('Multiple comments created:', multipleComments)
  
    // Видалення коментаря по ID
    const deletedComment = await prisma.comment.delete({
      where: { id: comment.id },
    })
  
    console.log('Comment deleted:', deletedComment)
  
    // Пошук коментаря за ID
    const foundComment = await prisma.comment.findUnique({
      where: { id: 2 },
    })
  
    console.log('Found comment:', foundComment)
  
    // Пошук коменту по Id
    const foundCommentWithPost = await prisma.comment.findUnique({
      where: { id: 3 },
      include: { post: true },
    })
  
    console.log('Found comment with post:', foundCommentWithPost)
  
    // Пошук поста по ID 
    const foundPostWithComments = await prisma.post.findUnique({
      where: { id: post.id },
      include: { comments: true },
    })
  
    console.log('Found post:', foundPostWithComments)
  
    // Оновлення коментаря
    const updatedComment = await prisma.comment.update({
      where: { id: 2 },
      data: { body: '' },
    })
  
    console.log('Updated comment:', updatedComment)
  }
  

findOneProduct().then(() => {
    prisma.$disconnect()
}).catch(err => {
    console.error(err);
    prisma.$disconnect()
})