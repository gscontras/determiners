library(ggplot2)

setwd("~/Documents/git/cocolab/determiners/experiments/5-infer-every/Submiterator-master")

num_round_dirs = 5
df = do.call(rbind, lapply(1:num_round_dirs, function(i) {
  return (read.csv(paste(
    'round', i, '/infer-every.csv', sep='')) %>%
      mutate(workerid = (workerid + (i-1)*9)))}))
#unique(df$comments)

d = df[df$language!="Telugu"&df$language!="",]

d$choice <- as.character(d$choice)

ggplot(d, aes(x=choice,fill=determiner))+
  geom_histogram(position=position_dodge())+
  facet_wrap(~verb) +
  ylab("count\n")+
  xlab("\nscene choice")+
  theme_bw()
#ggsave("../results/scene_hist.pdf",width=10.5,height=3.5)
