# High-throughput analytical tools

## Overview

The complete analytical GUI tools for fast **data processing**, **analysis** and **visualization** used in the group of MDI (Materials Discovery and Interfaces). Afterwards, all kinds of data including raw data, intermediate data and processed data could be saved/exported for further analysis.

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
 
 OS Requirements
---------------
This package has been tested exclusively on Windows 10 operating systems.

Python dependencies
-------------------
The list of required python packages is contained in the `requirements.txt <requirements.txt>`_ file in this repository. 

Install the requirements from PyPI using pip.
::

    $ python3 -m pip install -r requirements.txt
