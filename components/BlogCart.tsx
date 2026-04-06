import { View, Text, StyleSheet, Image } from "react-native";

type Blog = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: blog.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{blog.title}</Text>
        <Text style={styles.desc}>{blog.description}</Text>
      </View>
    </View>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
});
