"use client";

import { type Drink } from "@prisma/client";
import { useState } from "react";
import { CommentRatings } from "~/components/ui/rating";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Asterisk, Loader } from "lucide-react";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { createReview } from "~/actions";

type ReviewDrinkProps = {
  drink: Drink;
};

const ReviewDrink = (props: ReviewDrinkProps) => {
  const { drink } = props;
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (rating === 0) {
      toast.error("Please rate the drink!");
    }

    setIsSubmitting(true);

    const res = await createReview(drink.id, rating, review);
    if (res && !res.ok) {
      toast.error(res.error);
    } else {
      toast.success("Review submitted!");
      setRating(0);
      setReview("");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Review Drink</h1>
      <div>
        <Card className="-p-1 mb-5 border-2 border-[#8fbc5c] text-center">
          <CardHeader>
            <CardTitle>{drink.name}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <div className="mb-7 flex justify-center">
          <CommentRatings
            rating={rating}
            size={50}
            onRatingChange={setRating}
          />
          <Asterisk className="size-3 text-red-500" />
        </div>
        <Textarea
          onChange={(e) => setReview(e.target.value)}
          maxLength={50}
          placeholder="Write a review (optional)"
          value={review}
        />
        <Button
          disabled={rating === 0 || isSubmitting}
          className="w-full bg-[#8fbc5c] hover:bg-[#719646]"
          onClick={handleSubmit}
        >
          {isSubmitting ? <Loader /> : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default ReviewDrink;
