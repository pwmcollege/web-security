Chasing individual bad characters clearly wasn't working, so the developer changed tactics. Now your input gets wrapped in quotes before it joins the command, on the theory that the shell will treat the whole thing as one harmless string no matter what you put in it.

It's a reasonable instinct, and it almost holds. The weak point is that you also get to supply the very character that ends the quoting. Once the quote closes, you're back out in the open with the rest of the command line in front of you.

It's still the `ls` tool and still the same goal. Look at how the source builds the command, slip out of the quotes, and run something that prints `/flag`.
