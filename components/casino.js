"use client";

import { useState } from "react";
import Image from "next/image";
import { API_URL } from "../utils/config";
import { useRouter } from "next/router";

const ImageGallery = () => {
  const [iframeSrc, setIframeSrc] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(30);
  const imagesPerPage = 30;
  const router = useRouter();

  const getProviderUrl = (provider) => {
    switch (provider) {
      case "imoon":
        return `${API_URL}/api/imoongames`;
      case "turbo":
        return `${API_URL}/api/turbogames`;
      case "aviatrix":
        return `${API_URL}/api/aviatrixgames`;
      case "pixel":
        return `${API_URL}/api/pixelaviator`;
      case "avt":
        return `${API_URL}/api/avt`;
      case "smart":
        return `${API_URL}/api/smartgames`;
      case "pragmatic":
        return `${API_URL}/api/pragmatic`;
      default:
        return `${API_URL}/api/avt`;
    }
  };

  const handleClick = async (ref, action, provider) => {
    try {
      const token = localStorage.getItem("token");
      const url = getProviderUrl(provider);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ref, action, provider }),
      });

      if (response.status !== 200) {
        router.push("/dashboard");
      } else {
        const { iframeSrc } = await response.json();
        router.push({
          pathname: "/games",
          query: { iframeSrc },
        });
      }
    } catch (error) {
      console.error("Error fetching the iframe source:", error);
    }
  };

  // ✅ FULL images list (no omissions!)

  const images = [
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10floatdrg.png",
      alt: "Spinx",
      ref: "vs10floatdrg",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs1masterjoker.png",
      alt: "Spinx",
      ref: "vs1masterjoker",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20hburnhs.png",
      alt: "Spinx",
      ref: "vs20hburnhs",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20sknights.png",
      alt: "Spinx",
      ref: "vs20sknights",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25bomb.png",
      alt: "Spinx",
      ref: "vs25bomb",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25wildspells.png",
      alt: "Spinx",
      ref: "vs25wildspells",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs50pixie.png",
      alt: "Spinx",
      ref: "vs50pixie",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysbbb.png",
      alt: "Spinx",
      ref: "vswaysbbb",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/sc7piggies.png",
      alt: "Spinx",
      ref: "sc7piggies",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10fruity2.png",
      alt: "Spinx",
      ref: "vs10fruity2",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs1tigers.png",
      alt: "Spinx",
      ref: "vs1tigers",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20hercpeg.png",
      alt: "Spinx",
      ref: "vs20hercpeg",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20smugcove.png",
      alt: "Spinx",
      ref: "vs20smugcove",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25btygold.png",
      alt: "Spinx",
      ref: "vs25btygold",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25wolfgold.png",
      alt: "Spinx",
      ref: "vs25wolfgold",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs50safariking.png",
      alt: "Spinx",
      ref: "vs50safariking",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysbook.png",
      alt: "Spinx",
      ref: "vswaysbook",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/scgoldrush.png",
      alt: "Spinx",
      ref: "scgoldrush",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10gizagods.png",
      alt: "Spinx",
      ref: "vs10gizagods",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20aladdinsorc.png",
      alt: "Spinx",
      ref: "vs20aladdinsorc",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20hockey.png",
      alt: "Spinx",
      ref: "vs20hockey",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20sparta.png",
      alt: "Spinx",
      ref: "vs20sparta",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25champ.png",
      alt: "Spinx",
      ref: "vs25champ",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25xmasparty.png",
      alt: "Spinx",
      ref: "vs25xmasparty",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs576treasures.png",
      alt: "Spinx",
      ref: "vs576treasures",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysbufking.png",
      alt: "Spinx",
      ref: "vswaysbufking",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vpdt11.png",
      alt: "Spinx",
      ref: "vpdt11",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10goldfish.png",
      alt: "Spinx",
      ref: "vs10goldfish",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20amuleteg.png",
      alt: "Spinx",
      ref: "vs20amuleteg",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20hotzone.png",
      alt: "Spinx",
      ref: "vs20hotzone",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20starlight.png",
      alt: "Spinx",
      ref: "vs20starlight",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25chilli.png",
      alt: "Spinx",
      ref: "vs25chilli",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs30catz.png",
      alt: "Spinx",
      ref: "vs30catz",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5aztecgems.png",
      alt: "Spinx",
      ref: "vs5aztecgems",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayschilheat.png",
      alt: "Spinx",
      ref: "vswayschilheat",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs100firehot.png",
      alt: "Spinx",
      ref: "vs100firehot",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10kingofdth.png",
      alt: "Spinx",
      ref: "vs10kingofdth",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20bchprty.png",
      alt: "Spinx",
      ref: "vs20bchprty",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20jewelparty.png",
      alt: "Spinx",
      ref: "vs20jewelparty",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20stickysymbol.png",
      alt: "Spinx",
      ref: "vs20stickysymbol",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25davinci.png",
      alt: "Spinx",
      ref: "vs25davinci",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs3train.png",
      alt: "Spinx",
      ref: "vs3train",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5drhs.png",
      alt: "Spinx",
      ref: "vs5drhs",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysconcoll.png",
      alt: "Spinx",
      ref: "vswaysconcoll",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs100sh.png",
      alt: "Spinx",
      ref: "vs100sh",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10luckcharm.png",
      alt: "Spinx",
      ref: "vs10luckcharm",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20bermuda.png",
      alt: "Spinx",
      ref: "vs20bermuda",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20kraken2.png",
      alt: "Spinx",
      ref: "vs20kraken2",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20stickywild.png",
      alt: "Spinx",
      ref: "vs20stickywild",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25dragonkingdom.png",
      alt: "Spinx",
      ref: "vs25dragonkingdom",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs4096bufking.png",
      alt: "Spinx",
      ref: "vs4096bufking",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5drmystery.png",
      alt: "Spinx",
      ref: "vs5drmystery",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayscryscav.png",
      alt: "Spinx",
      ref: "vswayscryscav",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs1024atlantis.png",
      alt: "Spinx",
      ref: "vs1024atlantis",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10madame.png",
      alt: "Spinx",
      ref: "vs10madame",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20chickdrop.png",
      alt: "Spinx",
      ref: "vs20chickdrop",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20lampinf.png",
      alt: "Spinx",
      ref: "vs20lampinf",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20sugrux.png",
      alt: "Spinx",
      ref: "vs20sugrux",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25dwarves_new.png",
      alt: "Spinx",
      ref: "vs25dwarves_new",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs4096jurassic.png",
      alt: "Spinx",
      ref: "vs4096jurassic",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5hotburn.png",
      alt: "Spinx",
      ref: "vs5hotburn",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysdogs.png",
      alt: "Spinx",
      ref: "vswaysdogs",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs1024butterfly.png",
      alt: "Spinx",
      ref: "vs1024butterfly",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10mayangods.png",
      alt: "Spinx",
      ref: "vs10mayangods",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20chicken.png",
      alt: "Spinx",
      ref: "vs20chicken",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20lcount.png",
      alt: "Spinx",
      ref: "vs20lcount",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20superlanche.png",
      alt: "Spinx",
      ref: "vs20superlanche",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25dwarves.png",
      alt: "Spinx",
      ref: "vs25dwarves",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs4096magician.png",
      alt: "Spinx",
      ref: "vs4096magician",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5joker.png",
      alt: "Spinx",
      ref: "vs5joker",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayselements.png",
      alt: "Spinx",
      ref: "vswayselements",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs1024dtiger.png",
      alt: "Spinx",
      ref: "vs1024dtiger",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10mmm.png",
      alt: "Spinx",
      ref: "vs10mmm",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20cleocatra.png",
      alt: "Spinx",
      ref: "vs20cleocatra",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20leprexmas.png",
      alt: "Spinx",
      ref: "vs20leprexmas",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20superx.png",
      alt: "Spinx",
      ref: "vs20superx",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25gladiator.png",
      alt: "Spinx",
      ref: "vs25gladiator",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs4096mystery.png",
      alt: "Spinx",
      ref: "vs4096mystery",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5littlegem.png",
      alt: "Spinx",
      ref: "vs5littlegem",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayseternity.png",
      alt: "Spinx",
      ref: "vswayseternity",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs1024gmayhem.png",
      alt: "Spinx",
      ref: "vs1024gmayhem",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10nudgeit.png",
      alt: "Spinx",
      ref: "vs10nudgeit",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20clspwrndg.png",
      alt: "Spinx",
      ref: "vs20clspwrndg",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20ltng.png",
      alt: "Spinx",
      ref: "vs20ltng",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20swordofares.png",
      alt: "Spinx",
      ref: "vs20swordofares",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25goldparty.png",
      alt: "Spinx",
      ref: "vs25goldparty",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40cleoeye.png",
      alt: "Spinx",
      ref: "vs40cleoeye",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5sh.png",
      alt: "Spinx",
      ref: "vs5sh",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysfltdrg.png",
      alt: "Spinx",
      ref: "vswaysfltdrg",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs1024lionsd.png",
      alt: "Spinx",
      ref: "vs1024lionsd",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10powerlines.png",
      alt: "Spinx",
      ref: "vs10powerlines",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20clustwild.png",
      alt: "Spinx",
      ref: "vs20clustwild",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20magicpot.png",
      alt: "Spinx",
      ref: "vs20magicpot",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20terrorv.png",
      alt: "Spinx",
      ref: "vs20terrorv",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25hotfiesta.png",
      alt: "Spinx",
      ref: "vs25hotfiesta",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40cosmiccash.png",
      alt: "Spinx",
      ref: "vs40cosmiccash",
      provider: "pragmatic",
    },

    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysfrywld.png",
      alt: "Spinx",
      ref: "vswaysfrywld",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs1024temuj.png",
      alt: "Spinx",
      ref: "vs1024temuj",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10returndead.png",
      alt: "Spinx",
      ref: "vs10returndead",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20colcashzone.png",
      alt: "Spinx",
      ref: "vs20colcashzone",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20midas.png",
      alt: "Spinx",
      ref: "vs20midas",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20theights.png",
      alt: "Spinx",
      ref: "vs20theights",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25hotfiesta.png",
      alt: "Spinx",
      ref: "vs25hotfiesta",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40firehot.png",
      alt: "Spinx",
      ref: "vs40firehot",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5strh.png",
      alt: "Spinx",
      ref: "vs5strh",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysfuryodin.png",
      alt: "Spinx",
      ref: "vswaysfuryodin",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10amm.png",
      alt: "Spinx",
      ref: "vs10amm (1)",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10runes.png",
      alt: "Spinx",
      ref: "vs10runes",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20daydead.png",
      alt: "Spinx",
      ref: "vs20daydead",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20mochimon.png",
      alt: "Spinx",
      ref: "vs20mochimon",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20trsbox.png",
      alt: "Spinx",
      ref: "vs20trsbox",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25jokerking.png",
      alt: "Spinx",
      ref: "vs25jokerking",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40frrainbow.png",
      alt: "Spinx",
      ref: "vs40frrainbow",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5super7.png",
      alt: "Spinx",
      ref: "vs5super7",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayshammthor.png",
      alt: "Spinx",
      ref: "vswayshammthor",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10amm.png",
      alt: "Spinx",
      ref: "vs10amm",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10snakeladd.png",
      alt: "Spinx",
      ref: "vs10snakeladd",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20doghousemh.png",
      alt: "Spinx",
      ref: "vs20doghousemh",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20mparty.png",
      alt: "Spinx",
      ref: "vs20mparty",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20trswild2.png",
      alt: "Spinx",
      ref: "vs20trswild2",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25journey.png",
      alt: "Spinx",
      ref: "vs25journey",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40hotburnx.png",
      alt: "Spinx",
      ref: "vs40hotburnx",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5trdragons.png",
      alt: "Spinx",
      ref: "vs5trdragons",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayshive.png",
      alt: "Spinx",
      ref: "vswayshive",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10bbbonanza.png",
      alt: "Spinx",
      ref: "vs10bbbonanza",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10starpirate.png",
      alt: "Spinx",
      ref: "vs10starpirate",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20doghouse.png",
      alt: "Spinx",
      ref: "vs20doghouse",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20mtreasure.png",
      alt: "Spinx",
      ref: "vs20mtreasure",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20ultim5.png",
      alt: "Spinx",
      ref: "vs20ultim5",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25kfruit.png",
      alt: "Spinx",
      ref: "vs25kfruit",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40madwheel.png",
      alt: "Spinx",
      ref: "vs40madwheel",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5ultrab.png",
      alt: "Spinx",
      ref: "vs5ultrab",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysjkrdrop.png",
      alt: "Spinx",
      ref: "vswaysjkrdrop",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10bbhas.png",
      alt: "Spinx",
      ref: "vs10bbhas",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10threestar.png",
      alt: "Spinx",
      ref: "vs10threestar",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20drgbless.png",
      alt: "Spinx",
      ref: "vs20drgbless",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20mustanggld2.png",
      alt: "Spinx",
      ref: "vs20mustanggld2",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20underground.png",
      alt: "Spinx",
      ref: "vs20underground",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25kingdomsnojp.png",
      alt: "Spinx",
      ref: "vs25kingdomsnojp",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40mstrwild.png",
      alt: "Spinx",
      ref: "vs40mstrwild",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs5ultra.png",
      alt: "Spinx",
      ref: "vs5ultra",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayslight.png",
      alt: "Spinx",
      ref: "vswayslight",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10bbkir.png",
      alt: "Spinx",
      ref: "vs10bbkir",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10tictac.png",
      alt: "Spinx",
      ref: "vs10tictac",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20drtgold.png",
      alt: "Spinx",
      ref: "vs20drtgold",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20mvwild.png",
      alt: "Spinx",
      ref: "vs20mvwild",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20vegasmagic.png",
      alt: "Spinx",
      ref: "vs20vegasmagic",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25mustang.png",
      alt: "Spinx",
      ref: "vs25mustang",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40pirate.png",
      alt: "Spinx",
      ref: "vs40pirate",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs75bronco.png",
      alt: "Spinx",
      ref: "vs75bronco",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayslions.png",
      alt: "Spinx",
      ref: "vswayslions",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10bbsplxmas.png",
      alt: "Spinx",
      ref: "vs10bbsplxmas",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10tut.png",
      alt: "Spinx",
      ref: "vs10tut",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20dugems.png",
      alt: "Spinx",
      ref: "vs20dugems",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20octobeer.png",
      alt: "Spinx",
      ref: "vs20octobeer",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20wildboost.png",
      alt: "Spinx",
      ref: "vs20wildboost",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25newyear.png",
      alt: "Spinx",
      ref: "vs25newyear",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40pirgold.png",
      alt: "Spinx",
      ref: "vs40pirgold",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs75empress.png",
      alt: "Spinx",
      ref: "vs75empress",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysmadame.png",
      alt: "Spinx",
      ref: "vswaysmadame",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10bookfallen.png",
      alt: "Spinx",
      ref: "vs10bookfallen",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10txbigbass.png",
      alt: "Spinx",
      ref: "vs10txbigbass",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20egypttrs.png",
      alt: "Spinx",
      ref: "vs20egypttrs",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20olympgate.png",
      alt: "Spinx",
      ref: "vs20olympgate",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20wildpix.png",
      alt: "Spinx",
      ref: "vs20wildpix (1)",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25pandagold.png",
      alt: "Spinx",
      ref: "vs25pandagold",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40sh.png",
      alt: "Spinx",
      ref: "vs40sh",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs7776aztec.png",
      alt: "Spinx",
      ref: "vs7776aztec",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysmonkey.png",
      alt: "Spinx",
      ref: "vswaysmonkey",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10bookoftut.png",
      alt: "Spinx",
      ref: "vs10bookoftut",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10vampwolf.png",
      alt: "Spinx",
      ref: "vs10vampwolf",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20eightdragons.png",
      alt: "Spinx",
      ref: "vs20eightdragons",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20olympxmas.png",
      alt: "Spinx",
      ref: "vs20olympxmas",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20wildpix.png",
      alt: "Spinx",
      ref: "vs20wildpix",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25pandatemple.png",
      alt: "Spinx",
      ref: "vs25pandatemple",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40spartaking.png",
      alt: "Spinx",
      ref: "vs40spartaking",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs7776secrets.png",
      alt: "Spinx",
      ref: "vs7776secrets",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysmorient.png",
      alt: "Spinx",
      ref: "vswaysmorient",
      provider: "pragmatic",
    },

    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayspizza.png",
      alt: "Spinx",
      ref: "vswayspizza",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10bxmasbnza.png",
      alt: "Spinx",
      ref: "vs10bxmasbnza",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs117649starz.png",
      alt: "Spinx",
      ref: "vs117649starz",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20ekingrr.png",
      alt: "Spinx",
      ref: "vs20ekingrr",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20pistols.png",
      alt: "Spinx",
      ref: "vs20pistols",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20xmascarol.png",
      alt: "Spinx",
      ref: "vs20xmascarol",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25peking.png",
      alt: "Spinx",
      ref: "vs25peking",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40voodoo.png",
      alt: "Spinx",
      ref: "vs40voodoo",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs7monkeys.png",
      alt: "Spinx",
      ref: "vs7monkeys",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysredqueen.png",
      alt: "Spinx",
      ref: "vswaysredqueen",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10chkchase.png",
      alt: "Spinx",
      ref: "vs10chkchase",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs12bbb.png",
      alt: "Spinx",
      ref: "vs12bbb",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20emptybank.png",
      alt: "Spinx",
      ref: "vs20emptybank",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20porbs.png",
      alt: "Spinx",
      ref: "vs20porbs",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs243caishien.png",
      alt: "Spinx",
      ref: "vs243caishien",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25pyramid.png",
      alt: "Spinx",
      ref: "vs25pyramid",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40wanderw.png",
      alt: "Spinx",
      ref: "vs40wanderw",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs7pigs.png",
      alt: "Spinx",
      ref: "vs7pigs",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysrhino.png",
      alt: "Spinx",
      ref: "vswaysrhino",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10cowgold.png",
      alt: "Spinx",
      ref: "vs10cowgold",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs12bbbxmas.png",
      alt: "Spinx",
      ref: "vs12bbbxmas",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20excalibur.png",
      alt: "Spinx",
      ref: "vs20excalibur",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20rainbowg.png",
      alt: "Spinx",
      ref: "vs20rainbowg",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs243crystalcave.png",
      alt: "Spinx",
      ref: "vs243crystalcave",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25queenofgold.png",
      alt: "Spinx",
      ref: "vs25queenofgold",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs40wildwest.png",
      alt: "Spinx",
      ref: "vs40wildwest",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs8magicjourn.png",
      alt: "Spinx",
      ref: "vs8magicjourn",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysrsm.png",
      alt: "Spinx",
      ref: "vswaysrsm",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10crownfire.png",
      alt: "Spinx",
      ref: "vs10crownfire",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs12tropicana.png",
      alt: "Spinx",
      ref: "vs12tropicana",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20farmfest.png",
      alt: "Spinx",
      ref: "vs20farmfest",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20rhinoluxe.png",
      alt: "Spinx",
      ref: "vs20rhinoluxe",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs243dancingpar.png",
      alt: "Spinx",
      ref: "vs243dancingpar",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25rio.png",
      alt: "Spinx",
      ref: "vs25rio",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs432congocash.png",
      alt: "Spinx",
      ref: "vs432congocash",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs9aztecgemsdx.png",
      alt: "Spinx",
      ref: "vs9aztecgemsdx",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysstrwild.png",
      alt: "Spinx",
      ref: "vswaysstrwild",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10egrich.png",
      alt: "Spinx",
      ref: "vs10egrich",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs13ladyofmoon.png",
      alt: "Spinx",
      ref: "vs13ladyofmoon",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20fh.png",
      alt: "Spinx",
      ref: "vs20fh",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20rhino.png",
      alt: "Spinx",
      ref: "vs20rhino",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs243fortseren.png",
      alt: "Spinx",
      ref: "vs243fortseren",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25rlbank.png",
      alt: "Spinx",
      ref: "vs25rlbank",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs50aladdin.png",
      alt: "Spinx",
      ref: "vs50aladdin",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs9catz.png",
      alt: "Spinx",
      ref: "vs9catz",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysultrcoin.png",
      alt: "Spinx",
      ref: "vswaysultrcoin",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10egyptcls.png",
      alt: "Spinx",
      ref: "vs10egyptcls",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs15diamond.png",
      alt: "Spinx",
      ref: "vs15diamond",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20fparty2.png",
      alt: "Spinx",
      ref: "vs20fparty2",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20rockvegas.png",
      alt: "Spinx",
      ref: "vs20rockvegas",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs243fortune.png",
      alt: "Spinx",
      ref: "vs243fortune",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25romeoandjuliet.png",
      alt: "Spinx",
      ref: "vs25romeoandjuliet",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs50amt.png",
      alt: "Spinx",
      ref: "vs50amt",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs9chen.png",
      alt: "Spinx",
      ref: "vs9chen",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayswerewolf.png",
      alt: "Spinx",
      ref: "vswayswerewolf",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10egypt.png",
      alt: "Spinx",
      ref: "vs10egypt",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs15fairytale.png",
      alt: "Spinx",
      ref: "vs15fairytale",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20fruitparty.png",
      alt: "Spinx",
      ref: "vs20fruitparty",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20rome.png",
      alt: "Spinx",
      ref: "vs20rome",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs243lionsgold.png",
      alt: "Spinx",
      ref: "vs243lionsgold",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25safari.png",
      alt: "Spinx",
      ref: "vs25safari",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs50chinesecharms.png",
      alt: "Spinx",
      ref: "vs50chinesecharms",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs9hockey.png",
      alt: "Spinx",
      ref: "vs9hockey",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayswest.png",
      alt: "Spinx",
      ref: "vswayswest",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10eyestorm.png",
      alt: "Spinx",
      ref: "vs10eyestorm",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs15godsofwar.png",
      alt: "Spinx",
      ref: "vs15godsofwar",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20fruitsw.png",
      alt: "Spinx",
      ref: "vs20fruitsw",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20santa.png",
      alt: "Spinx",
      ref: "vs20santa",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs243lions.png",
      alt: "Spinx",
      ref: "vs243lions",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25scarabqueen.png",
      alt: "Spinx",
      ref: "vs25scarabqueen",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs50hercules.png",
      alt: "Spinx",
      ref: "vs50hercules",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs9hotroll.png",
      alt: "Spinx",
      ref: "vs9hotroll",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayswildwest.png",
      alt: "Spinx",
      ref: "vswayswildwest",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10fdrasbf.png",
      alt: "Spinx",
      ref: "vs10fdrasbf",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs1600drago.png",
      alt: "Spinx",
      ref: "vs1600drago",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20gobnudge.png",
      alt: "Spinx",
      ref: "vs20gobnudge",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20santawonder.png",
      alt: "Spinx",
      ref: "vs20santawonder",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs243mwarrior.png",
      alt: "Spinx",
      ref: "vs243mwarrior",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25sea.png",
      alt: "Spinx",
      ref: "vs25sea",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs50juicyfr.png",
      alt: "Spinx",
      ref: "vs50juicyfr",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs9madmonkey.png",
      alt: "Spinx",
      ref: "vs9madmonkey",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayswwriches.png",
      alt: "Spinx",
      ref: "vswayswwriches",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10firestrike2.png",
      alt: "Spinx",
      ref: "vs10firestrike2",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs18mashang.png",
      alt: "Spinx",
      ref: "vs18mashang",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20goldclust.png",
      alt: "Spinx",
      ref: "vs20goldclust",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20sbxmas.png",
      alt: "Spinx",
      ref: "vs20sbxmas",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs243queenie.png",
      alt: "Spinx",
      ref: "vs243queenie",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25spgldways.png",
      alt: "Spinx",
      ref: "vs25spgldways",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs50kingkong.png",
      alt: "Spinx",
      ref: "vs50kingkong",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs9outlaw.png",
      alt: "Spinx",
      ref: "vs9outlaw",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysxjuicy.png",
      alt: "Spinx",
      ref: "vswaysxjuicy",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10firestrike.png",
      alt: "Spinx",
      ref: "vs10firestrike",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs1dragon8.png",
      alt: "Spinx",
      ref: "vs1dragon8",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20goldfever.png",
      alt: "Spinx",
      ref: "vs20goldfever",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20schristmas.png",
      alt: "Spinx",
      ref: "vs20schristmas",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25archer.png",
      alt: "Spinx",
      ref: "vs25archer",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25vegas.png",
      alt: "Spinx",
      ref: "vs25vegas",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs50mightra.png",
      alt: "Spinx",
      ref: "vs50mightra",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs9piggybank.png",
      alt: "Spinx",
      ref: "vs9piggybank",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysyumyum.png",
      alt: "Spinx",
      ref: "vswaysyumyum",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs10fisheye.png",
      alt: "Spinx",
      ref: "vs10fisheye",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs1fortunetree.png",
      alt: "Spinx",
      ref: "vs1fortunetree",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20gorilla.png",
      alt: "Spinx",
      ref: "vs20gorilla",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs20sh.png",
      alt: "Spinx",
      ref: "vs20sh",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25bkofkngdm.png",
      alt: "Spinx",
      ref: "vs25bkofkngdm",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs25walker.png",
      alt: "Spinx",
      ref: "vs25walker",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vs50northgard.png",
      alt: "Spinx",
      ref: "vs50northgard",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswaysbankbonz.png",
      alt: "Spinx",
      ref: "vswaysbankbonz",
      provider: "pragmatic",
    },
    {
      src: "https://falmebet.fra1.digitaloceanspaces.com/pragmatic/vswayszombcarn.png",
      alt: "Spinx",
      ref: "vswayszombcarn",
      provider: "pragmatic",
    },
  ];

  const currentImages = images.slice(0, visibleCount);

  return (
    <div className="text-center py-6">
      {/* Images Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4">
        {currentImages.map((image, index) => (
          <div
            key={`${image.ref}-${index}`}
            className="cursor-pointer rounded-lg overflow-hidden  hover:scale-105 transition-transform duration-300 bg-[#1d2933]"
            onClick={() => handleClick(image.ref, "play", image.provider)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={120}
              height={120}
              className="w-full aspect-square object-center rounded"
            />
          </div>
        ))}
      </div>

      {/* Iframe */}
      {iframeSrc && (
        <div className="mt-6 w-full max-w-5xl mx-auto">
          <iframe
            src={iframeSrc}
            frameBorder="0"
            className="w-full h-[500px] rounded-md shadow-lg"
          />
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < images.length && (
        <div className="mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + imagesPerPage)}
            className="px-6 py-2 bg-[#a21cf0] text-white rounded-lg font-medium hover:bg-[#9015d6] transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
