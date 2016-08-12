library(ggplot2)

setwd("~/Documents/git/cocolab/determiners/experiments/analysis/")

library(tidyr)
library(dplyr)

#d = read.csv("round4/order-preference-expanded.csv")

#d[sapply(d, is.factor)] <- lapply(d[sapply(d, is.factor)], as.character)
#df[sapply(df, is.factor)] <- lapply(df[sapply(df, is.factor)], as.character)
#e = rbind(df,d)

num_round_dirs = 1
df = do.call(rbind, lapply(1:num_round_dirs, function(i) {
  return (read.csv(paste(
    '../4-utterance-every/Submiterator-master/','round', i, '/utterance-every-trials.csv', sep='')) %>%
      mutate(workerid = (workerid + (i-1)*9)))}))
#unique(df$comments)
num_round_dirs = 1
sf = do.call(rbind, lapply(1:num_round_dirs, function(i) {
  return (read.csv(paste(
    '../4-utterance-every/Submiterator-master/','round', i, '/utterance-every-subject_information.csv', sep='')) %>%
      mutate(workerid = (workerid + (i-1)*9)))}))
head(sf)
unique(sf$language)
df$language = sf$language[match(df$workerid,sf$workerid)]
summary(df)

d <- df

d$scene <- as.character(d$scene)

ggplot(d, aes(x=scene,fill=response))+
  geom_histogram(position=position_dodge())+
  #facet_wrap(~verb) +
  ylab("count\n")+
  xlab("\nscene")+
  theme_bw()
#ggsave("../results/utterance_hist.pdf",height=3.5)



## load in comprehension data

num_round_dirs = 5
cf = do.call(rbind, lapply(1:num_round_dirs, function(i) {
  return (read.csv(paste(
    '../5-infer-every/Submiterator-master/','round', i, '/infer-every.csv', sep='')) %>%
      mutate(workerid = (workerid + (i-1)*9)))}))
#unique(df$comments)

c = cf[df$language!="Telugu"&df$language!="",]

c$choice <- as.character(c$choice)
head(c)
c <- subset(c, select = c("workerid","animal2","animal1","color1","color2","slide_number","language","determiner","verb","choice"))
head(c)
c$expt = "comprehension"
c$response = paste(c$determiner,"_",c$verb,sep="")
c$scene = c$choice
d$response = paste(d$determiner,"_",d$verb,sep="")
d$choice = d$scene

## merge comprehension and production

head(d)
d$determiner = "A"
d[nchar(as.character(d$response))>7,]$determiner = "every"
d[nchar(as.character(d$response))==6,]$determiner = "The"
d[nchar(as.character(d$response))==7,]$determiner = "The"
d$verb = "is"
d[nchar(as.character(d$response))==7,]$verb = "not"
d[nchar(as.character(d$response))==5,]$verb = "not"
d[nchar(as.character(d$response))==9,]$verb = "not"
head(d,50)

d$expt = "production"

d = rbind(d,c)
head(d)

# remove 2121 2122 2222 scens from comprehension

d <- subset(d, scene != "2121")
d <- subset(d, scene != "2122")
d <- subset(d, scene != "2222")

ggplot(d, aes(x=scene,fill=response))+
  geom_histogram(position=position_dodge())+
  facet_grid(expt~.,scales="free_y") +
  ylab("count\n")+
  xlab("\nscene")+
  theme_bw()
#ggsave("../results/prod_comp_hist.pdf")






###########################################
##### COMPREHENSION MODEL PREDICTIONS #####
###########################################

a_is = read.csv("~/Documents/git/CoCoLab/determiners/model/a_is.csv", quote = "'")
head(a_is)
a_is$utterance = "A_is"
a_not = read.csv("~/Documents/git/CoCoLab/determiners/model/a_not.csv", quote = "'")
a_not$utterance = "A_not"
the_is = read.csv("~/Documents/git/CoCoLab/determiners/model/the_is.csv", quote = "'")
the_is$utterance = "The_is"
the_not = read.csv("~/Documents/git/CoCoLab/determiners/model/the_not.csv", quote = "'")
the_not$utterance = "The_not"
every_is = read.csv("~/Documents/git/CoCoLab/determiners/model/every_is.csv", quote = "'")
every_is$utterance = "Everything_is"
every_not = read.csv("~/Documents/git/CoCoLab/determiners/model/every_not.csv", quote = "'")
every_not$utterance = "Everything_not"
m = rbind(the_not,a_is,a_not,the_is,every_is,every_not)
m$value <- as.character(m$Value)
m$state = NA
m[m$value=="[{\"fep\":false,\"blue\":false},{\"fep\":true,\"blue\":true}]",]$state = 1122
m[m$value=="[{\"fep\":false,\"blue\":true},{\"fep\":true,\"blue\":true}]",]$state = 1121
m[m$value=="[{\"fep\":true,\"blue\":false},{\"fep\":true,\"blue\":true}]",]$state = 1112
m[m$value=="[{\"fep\":true,\"blue\":true},{\"fep\":false,\"blue\":false}]",]$state = 1122
m[m$value=="[{\"fep\":true,\"blue\":true},{\"fep\":false,\"blue\":true}]",]$state = 1121
m[m$value=="[{\"fep\":true,\"blue\":true},{\"fep\":true,\"blue\":false}]",]$state = 1112
m[m$value=="[{\"fep\":true,\"blue\":true},{\"fep\":true,\"blue\":true}]",]$state = 1111
m[m$value=="[{\"fep\":false,\"blue\":false},{\"fep\":true,\"blue\":false}]",]$state = 1222
m[m$value=="[{\"fep\":false,\"blue\":true},{\"fep\":true,\"blue\":false}]",]$state = 1221
m[m$value=="[{\"fep\":true,\"blue\":false},{\"fep\":false,\"blue\":false}]",]$state = 1222
m[m$value=="[{\"fep\":true,\"blue\":false},{\"fep\":false,\"blue\":true}]",]$state = 1221
m[m$value=="[{\"fep\":true,\"blue\":false},{\"fep\":true,\"blue\":false}]",]$state = 1212
m[m$value=="[{\"fep\":false,\"blue\":true},{\"fep\":false,\"blue\":true}]",]$state = 2121
m[m$value=="[{\"fep\":false,\"blue\":true},{\"fep\":true,\"blue\":true}]",]$state = 1121
m[m$value=="[{\"fep\":false,\"blue\":false},{\"fep\":false,\"blue\":false}]",]$state = 2222
m$expt = "model"
unique(m$state)

### load comprehension data
summary(c)
c$expt = "human"
# remove 2121 2122 2222 scens from comprehension
#c <- subset(c, scene != "2121")
#c <- subset(c, scene != "2122")
#c <- subset(c, scene != "2222")
head(c)
head(m)
m_d <- subset(m, select = c("utterance","state","Probability","expt"))
m_d$state <- as.factor(m_d$state)
m_d$utterance <- as.factor(m_d$utterance)
m_d$Probability <- as.numeric(as.character(m_d$Probability))
c_d <- subset(c, select = c("response","scene","expt"))
c_d <- as.data.frame(prop.table(table(c_d$response,c_d$scene),1),mar=1)
c_d$expt = "human"
colnames(c_d) <- c("utterance","state","Probability","expt")
#m.all <- rbind(m_d, cbind(expand.grid(utterance=levels(m_d$utterance), state=levels(m_d$state)), Probability=NA, expt="model"))
#m.all$Probability <- as.numeric(as.character(m.all$Probability))

d = rbind(c_d,m_d)

agg = aggregate(Probability~utterance*state*expt,data=d,sum)
dat.all <- rbind(agg, cbind(expand.grid(utterance=levels(agg$utterance), state=levels(agg$state)), Probability=NA, expt="model"))

#dat.all <- rbind(d, cbind(expand.grid(utterance=levels(d$utterance), state=levels(d$state)), Probability=NA, expt="model"))
#dat.all$Probability <- as.numeric(dat.all$Probability)

#agg = aggregate(Probability~utterance*state*expt,data=dat.all,sum)

#dat.all <- d

ggplot(dat.all, aes(x=expt,y=Probability,color=state))+
  #geom_histogram(position=position_dodge())+
  #geom_point(position=position_dodge())+
  geom_bar(aes(fill=state),stat="identity",position=position_dodge())+
  facet_grid(.~utterance)+
  theme_bw()+
  labs(title="comprehension\n")
#ggsave("human_model_listener_alpha-1.pdf")



###########################################
##### PRODUCTION MODEL PREDICTIONS #######
###########################################

w1111 = read.csv("~/Documents/git/CoCoLab/determiners/model/1111.csv", quote = "'")
head(w1111)
w1111$scene = 1111
w1112 = read.csv("~/Documents/git/CoCoLab/determiners/model/1112.csv", quote = "'")
head(w1112)
w1112$scene = 1112
w1212 = read.csv("~/Documents/git/CoCoLab/determiners/model/1212.csv", quote = "'")
head(w1212)
w1212$scene = 1212
w1121 = read.csv("~/Documents/git/CoCoLab/determiners/model/1121.csv", quote = "'")
head(w1121)
w1121$scene = 1121
w1122 = read.csv("~/Documents/git/CoCoLab/determiners/model/1122.csv", quote = "'")
head(w1122)
w1122$scene = 1122
w1221 = read.csv("~/Documents/git/CoCoLab/determiners/model/1221.csv", quote = "'")
head(w1221)
w1221$scene = 1221
w1222 = read.csv("~/Documents/git/CoCoLab/determiners/model/1222.csv", quote = "'")
head(w1222)
w1222$scene = 1222
m = rbind(w1111,w1112,w1212,w1121,w1122,w1221,w1222)
head(m)
m$response = NA
m[m$Value=="\"every thing is blue\"",]$response = "every_is"
m[m$Value=="\"\"",]$response = "null"
m[m$Value=="\"a fep is blue\"",]$response = "a_is"
m[m$Value=="\"the fep is blue\"",]$response = "the_is"
m[m$Value=="\"a fep isnt blue\"",]$response = "a_not"
m[m$Value=="\"the fep isnt blue\"",]$response = "the_not"
m[m$Value=="\"every thing isnt blue\"",]$response = "every_not"
head(m)
head(d)
m$expt = "model"
d_d <- subset(d, select = c("response","scene","expt"))
d_d <- as.data.frame(prop.table(table(d_d$response,d_d$scene),1),mar=1)
d_d$expt = "human"
colnames(d_d) <- c("utterance","state","Probability","expt")
m_d <- subset(m, select = c("response","scene","Probability","expt"))
head(m_d)
colnames(m_d) <- c("utterance","state","Probability","expt")
p_d = rbind(d_d,m_d)
p_d$Probability <- as.numeric(as.character(p_d$Probability))


p_agg = aggregate(Probability~utterance*state*expt,data=p_d,sum)
p_dat.all <- rbind(p_agg, cbind(expand.grid(utterance=levels(p_agg$utterance), state=levels(p_agg$state)), Probability=NA, expt="model"))


ggplot(p_dat.all, aes(x=expt,y=Probability,color=utterance))+
  #geom_histogram(position=position_dodge())+
  #geom_point(position=position_dodge())+
  geom_bar(aes(fill=utterance),stat="identity",position=position_dodge())+
  facet_grid(.~state)+
  theme_bw() +
  labs(title="production\n")
#ggsave("human_model_speaker_alpha-1.pdf")
