# High-throughput analytical tools

## Overview

The complete software tools (HT-tools) for high-throughput characterization of materials libraries in experimental material science. HT tools contain a series of GUI tools for **data processing**, **analysis** and **visualization** with high-quality and increased productivity. These tools have easy to use interface, and ensure live-time graphical display, and simultaneous review mode analysis.


## Tools that are included in this project:
1. ### EDX measurement related tools
  - EDX composition: view and analysis EDX data. The data could be a complete materials library containing 342 measurement points or a strip or a chip.
  - Adjust materials libraries composition: predict and find the desired element content ratio for sputtering experiment. The tool supports any number of cathodes.
  - Wafer (materials libraries) comparison: compare how similar are two libraries in the given deviations.
2. ### Thickness tools
  - Thickness: determine and calculate thickness data obtained from profilometer (Ambios)
3. ### XRD related tools
  - 2D to 1D convert: automated convert XRD frames (Bruker D8 Discover) into any kind of supported format.
  - Baseline subtraction: subtract baseline for XRD data.
  - Phase identification: XRD data analysis and phase determination based on comparison of data with ICSD database.
  - Reference (.cif) rename: rename and reformat XRD data.
4. ### Band gap and resistance related tools
  - Band gap determination: automated calculate band gap.
  - Room-temperature resistance: visualize resistance data.
  - Temperature-dependent resistance: analysis and view of multiple reisitance data.
5. ### Electrocatalytic related tools
  - SDC analysis: fast view heatmap for a library data
  - SECCM tool: define the overlapping of XRD and electrocatalytic data.
6. ### Other tools
  - Sputter concentration: get a first impression of sputtering results
  - Wafer photo RGB: view and extract wafer image from photos
<br>
<div align = "center">
  <img align = "center" width = "1000" src = "/assets/image1.jpg">
<p align = "center">Example of visualization the coordinated tool chain for high-throughput data analysis. Multiple diffraction data files are imported to a
preprocessing tool. Background subtraction, phase identification, element composition visualization are automated performed and the results are saved in database.</p> 
</div>

### Main features

<div>
<ul aling = "left">
  <li>Automate routine tasks for quick and easy analysis</li>
  <li>Mouse click to acquire and report data</li>
  <li>Display configuration options for reporting according journal's requirement</li>
  <li>Dynamically view for the most accurate and efficient analysis</li>
  <li>Flexibility to search, select, and combine data</li>
  <li>Easily compare data from multiple samples in the same report</li>
  <li>Save and recall data processing procedures to automate data analysis and visualization</li>
</ul>
  <img width = "50%" align = "right" src = "/assets/image2.jpg">
</div>

 
 OS Requirements
---------------
This package has been tested exclusively on Windows 10 operating systems.

Python dependencies
-------------------
The list of required python packages is contained in the `requirements.txt <requirements.txt>`_ file in this repository. 

Install the requirements from PyPI using pip.
::

    $ python3 -m pip install -r requirements.txt
