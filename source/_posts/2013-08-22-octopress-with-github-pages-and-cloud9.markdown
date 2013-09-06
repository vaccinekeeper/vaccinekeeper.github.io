---
layout: post
title: "Octopress with Github Pages and Cloud9"
date: 2013-08-22 14:35
comments: true
categories: tech
author: Michael Janiak
---

This blog runs on [Octopress](http://octopress.org/), a framework for [Jekyll](https://github.com/mojombo/jekyll) 
and is hosted on [GitHub Pages](http://pages.github.com/). I've also set it up on [Cloud9](https://c9.io/), a
sweet web app IDE that enables you to write blog posts on any device.

Having done a bit of research, when it comes down to blogging solutions, you either have php based CMS's
such as [WordPress](http://wordpress.org/), Drupal, Joomla or static site generators like Jekyll. I've used Wordpress before
but it's functionality has always irritated me, probably because my php is awful, it's too bloated for what I need 
and don't want to use a database for various reasons.

<!-- more -->

Jekyll has all the functionality I need from a blog but without a database. This is great as it 
means I can host it out of static locations such as GitHub Pages or [Amazon S3](http://aws.amazon.com/s3/). 
Not only are these services free, at least for now, but they should be more robust than your random 
shared web hosting provider.

Jekyll by itself is bare bones, you need to create your own directory structure, templates etc, so to make life
easier I turned to Octopress, an establish framework that takes care of some pain.

The only thing missing with Octopress / Jekyll is it doesn't have a web interface for when I'm on the go,
so that's why I plugged it into Cloud9. Not only does Cloud9 give you an IDE, they also give you a
Ruby virtual machine. Jekyll runs on Ruby, so this means I can do 100% of the setup from Cloud9.

Getting it running wasn't completely trivial so I figure this could be a useful blog post for those that are into this kind of thing!


#### 0. Open a GitHub account and set up a public SSH key that you can use with Cloud9

Out of scope for this blog but there are plenty of instructions floating around on the web, 
including those [straight from the horses mouth](https://help.github.com/articles/generating-ssh-keys)


#### 1. Create a repository for the GitHub Pages hosted website

Decide on [organization or project page](https://help.github.com/articles/user-organization-and-project-pages)

I went with an organization page, so if you want to set that up on your GitHub account go to the GitHub 
[new organization page](https://github.com/account/organizations/new)

Create a repository for your website. The naming convention is important, it must be `organization.github.io` or `user.github.io`. 
I've seen .com work too. So `organization.github.io` will output a website at: `http://organization.github.io`.
Do not create a README or put anything in the repository for now


#### 2. Open a Cloud9 account and create a workspace with Octopress on it

Go to [Cloud9](c9.io) and login with your github account. Click on the "Create new workspace" button, then select "clone from URL".
Use the following url `git://github.com/imathis/octopress.git` and name it whatever you want


#### 3. Set Octopress up within Cloud9

Click on your Octopress project and hit the "start editing" button. Go to the terminal

Check the ruby version just in case, it should be 1.9.3
    ruby --version

install the bundler dependency manager
    gem install bundler

install dependencies specified in Gemfile
    bundle install

Octopress builds a Ruby [Rakefile](http://rake.rubyforge.org/doc/rakefile_rdoc.html) for you with all your tasks, 
to run a task you use the rake command. 

First up, install the default theme
    rake install


#### 4. At this stage you can generate your blog and view a preview or you can go straight to 5

Unlike Wordpress, which actively pulls your posts out of a database, Jekyll parses your source files then uses that information
to generate a static version of your website. Every time you make a change to the source, that is write a new page or blog post,
you need to generate a new blog. [More here](http://jekyllbootstrap.com/lessons/jekyll-introduction.html).

Run the Octopress blog generator
    rake generate

If you run the preview now you will get `Error: you may be using the wrong PORT & HOST for your server app`

To fix that, [edit the Rakefile](http://www.devopsy.com/blog/2012/10/04/octopress-on-cloud9/):

    #server_port     = "4000"      # Comment out this line and the lines below
    server_host     = ENV['IP'] ||= '0.0.0.0'     # server bind address for preview server
    server_port     = ENV['PORT'] ||= "4000"      # port for preview server eg. localhost:4000

    #rackupPid = Process.spawn("rackup --port #{server_port}") #Comment out this line and add the line below
    rackupPid = Process.spawn("rackup --host #{server_host} --port #{server_port}")

New you can view a preview at `http://workspace.accountname.c9.io` just type
    rake preview


#### 5. Get your blog ready for GitHub pages

Octopress gives you a single command for setting up on GitHub pages that does lots of useful things, 
[read more here](http://octopress.org/docs/deploying/github)
    rake setup_github_pages

You will need to enter your repository url `git@github.com:organization/organization.github.io.git`

Your source is now on your "source" branch, while your blog is on the "master" branch
 

#### 6. Deploy and commit everything to GitHub

Generate your blog content (if you skipped step 4)
    rake generate

Deploy the master branch, that is the static assets for your blog onto GitHub using Octopress' deploy command
    rake deploy
 
Commit the source branch to GitHub

    git add .
    git commit -m 'source commit'
    git push origin source

Now if you go to your repository at `github.com/organization/organization.github.io` you will notice that
you have two branches, a master branch and a source and if you go to `http://organization.github.io/`
you have your blog!


#### 7. Start [blogging with Octopress](http://octopress.org/docs/blogging/)

    rake new_post["Octopress rulez"]
    rake generate

then preview or deploy
    rake preview
    rake deploy

And remember to commit the source
    git add .
    git commit -m 'source commit'
    git push origin source


#### 8. Optional setup for you local machine

Install Ruby if you haven't got it already. Should be standard on OSX but [on windows you can use this installer](http://rubyinstaller.org/),
just make sure you get 1.9.3.

Clone the repository
    git clone git@github.com:organization/organization.github.io.git project name

Or if you've already cloned it and want to get the latest version just run
	git checkout source
    git pull origin source

This will work from the Cloud9 side as well, just remember to include the `origin source`, for some reason my source
branch was merging into my master branch.

Unless you really know what you're doing with Git, which I do not, I do not suggest running `rake setup_github_pages` or 
`rake generate` in this location. For me it just created a bunch of conflicts in my Cloud9 workspace that I did not have 
the chops to resolve.

Write some more blog posts then commit the source

    git add .
    git commit -m 'source commit'
    git push origin source