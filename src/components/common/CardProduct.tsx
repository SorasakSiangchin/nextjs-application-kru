"use client";

import { ProductData } from "@/interfaces/product/product";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type Props = {
  product: ProductData;
};

const CardProduct: FC<Props> = ({ product }) => {
  const router = useRouter();
  return (
    <Box className="cursor-pointer transition duration-500 hover:scale-110">
      <Card
        variant="outlined"
        sx={{ maxWidth: 345 }}
        onClick={() => router.push(`/shop/${product.id}`)}
      >
        <CardMedia
          sx={{ height: 200 }}
          image={product.imageUrl}
          title={product.name}
          component={Box}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            ฿ {product.price}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardProduct;
