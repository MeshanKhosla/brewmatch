"use client";

import { type Drink } from "@prisma/client";
import { useState } from "react";
import { CommentRatings } from "~/components/ui/rating";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Asterisk } from "lucide-react";

type ReviewDrinkProps = {
  drink: Drink;
};

const ReviewDrink = (props: ReviewDrinkProps) => {
  const { drink } = props;
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please rate the drink!");
    }

    console.log("Submitting review with ", {
      rating,
      review,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Review Drink</h1>
      <div className="flex">
        <CommentRatings rating={rating} size={50} onRatingChange={setRating} />
        <Asterisk className="size-3 text-red-500" />
      </div>
      <Textarea
        onChange={(e) => setReview(e.target.value)}
        maxLength={50}
        placeholder="Write a review (optional)"
        value={review}
      />
      <Button
        disabled={rating === 0}
        className="mt-3 w-full bg-[#8fbc5c] hover:bg-[#719646]"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default ReviewDrink;
